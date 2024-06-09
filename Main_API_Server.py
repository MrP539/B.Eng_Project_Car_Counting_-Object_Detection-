from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
import numpy as np
import datetime
import cv2
from ultralytics import YOLO
from collections import deque
from PIL import ImageFont, ImageDraw, Image
import easyocr
import json
import base64
import pymongo
import os
import re
from pymongo import MongoClient 
import glob 
from bson.objectid import ObjectId

from deep_sort.deep_sort.tracker import Tracker
from deep_sort.deep_sort import nn_matching
from deep_sort.deep_sort.detection import Detection
from deep_sort.tools import generate_detections as gdet

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

list_output =[]

UPLOAD_FOLDER = 'uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)
@app.route('/cnn/api/analyze/<string:intime>/<string:nature_gate_in>/<int:gate_number_in>', methods=['POST'])
@cross_origin()
def analyze(intime,nature_gate_in,gate_number_in):
    
    print(intime,nature_gate_in,gate_number_in)
    client = pymongo.MongoClient("mongodb+srv://Kong:Kongzaza123@cluster0.apq0hr5.mongodb.net/")
    
    #function ที่สร้างขึ้นเพื่อ ดึงค่าความ กว้าง,สูง,FPS จากvideo_input และสร้างส่วนต่างปรับสมดุลของวิดีโอ (fourcc) โดยใช้ cv2.VideoWriter_fourcc
    # จากนั้นใช้คำสั่ง cv2.VideoWriter เขียนวิดีโอขนาดเปล่า กว้าง=frame_width,สูง=frame_height,FPS=fps และ FourCC code 'MP4V'. 
    def CREATE_VEDIO_WRITER(video_cap, output_filename):

        frame_width = int(video_cap.get(cv2.CAP_PROP_FRAME_WIDTH))
        frame_height = int(video_cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
        fourcc = cv2.VideoWriter_fourcc(*'MP4V')
        fps = int(video_cap.get(cv2.CAP_PROP_FPS))
        writer = cv2.VideoWriter(output_filename, fourcc, fps,(frame_width, frame_height))

        return writer

    def VEHICLE_TRACKING_TIME(duration_second):
        format_start_time = datetime.datetime(year,month,day,H0,M0,S0)
        calculate = format_start_time + datetime.timedelta(seconds=duration_second)
        format_track_time = calculate.strftime("%Y-%m-%dT%H:%M:%SZ")
    
        return(format_track_time)
    
    def VEHICLE_TRACKING_TIME_for_rename(duration_second):
        format_start_time = datetime.datetime(year,month,day,H0,M0,S0)
        calculate = format_start_time + datetime.timedelta(seconds=duration_second)
        format_track_time = calculate.strftime("%Y-%m-%dT%H_%M_%SZ")
    
        return(format_track_time)
    
    def POINTS(event, x, y, flags, param):
        if event == cv2.EVENT_MOUSEMOVE :  
            colorsBGR = [x, y]
            print(colorsBGR)

    def SHOW_THAI_LANG(frame,x,y,result_reading):
        frame=frame
        font_path = "./angsana.ttc"
        font= ImageFont.truetype(font_path,30)
        img_pil = Image.fromarray(frame)
        draw = ImageDraw.Draw(img_pil)
        draw.text((x,y),result_reading,font=font,fill=(0,0,255))
        frame = np.array(img_pil)
        return(frame)

    def ADJUST_DETECT_AREA(area,video_cap):
        area=area
        ratio_y = (video_cap.get(cv2.CAP_PROP_FRAME_HEIGHT)/720.0)
        ratio_x = (video_cap.get(cv2.CAP_PROP_FRAME_WIDTH)/1280)
        x1 = area[0][0]*ratio_x
        y1 = area[0][1]*ratio_y
        x2 = area[1][0]*ratio_x
        y2 = area[1][1]*ratio_y
        x3 = area[2][0]*ratio_x
        y3 = area[2][1]*ratio_y
        x4 = area[3][0]*ratio_x
        y4 = area[3][1]*ratio_y
        area=[(x1,y1),(x2,y2),(x3,y3),(x4,y4)]
        return(area)
  
    def CREATE_IMG2STR(part):
        with open(part,"rb") as image_file:
            encoded_string = base64.b64encode(image_file.read()).decode('utf-8')
        
        return(encoded_string)
    
    def EXPORT2MOGODB(data,main_dir,sub_dir):
        db = client[str(main_dir)]
        collection = db[str(sub_dir)]
        collection.insert_one(data)

    def LOGIC():

        str_start_time = VEHICLE_TRACKING_TIME(0)[0:13]
        str_end_time = VEHICLE_TRACKING_TIME(duration)[0:13]

        str_start_time_logic = VEHICLE_TRACKING_TIME(0)
        str_end_time_logic= VEHICLE_TRACKING_TIME(duration)

        start_date_str, start_time_str = str_start_time.split("T")
        end_date_str, end_time_str = str_end_time.split("T")


        start_datetime = datetime.datetime.strptime(start_date_str + "-" + start_time_str, "%Y-%m-%d-%H")
        end_datetime = datetime.datetime.strptime(end_date_str + "-" + end_time_str, "%Y-%m-%d-%H")

        # # คำนวณจำนวนวันระหว่างวันเริ่มต้นและสิ้นสุด
        num_days = (end_datetime - start_datetime).days

        # # คำนวณจำนวนช่วงเวลาทั้งหมดโดยนับทั้งวันและชั่วโมง
        if   (str_start_time_logic[14:19] == "00:00" and str_end_time_logic[14:19] == "00:00"  ) or str_end_time_logic[14:19] == "00:00" :
                
                range_for_logic = (num_days * 24 + (end_datetime - start_datetime).seconds // 3600)
               
        else :
                range_for_logic = (num_days * 24 + (end_datetime - start_datetime).seconds // 3600)+1
               

        return(range_for_logic)
    
    def ISOLATE(nature_gate,gate_number):
        for ii in range(LOGIC()):

            sub_car_count,sub_motorbike_count,sub_truck_count,sub_total_vehicle_value = 0,0,0,0
            logic_time = datetime.datetime(year,month,day,H0,0,0)
            logic_time = logic_time + datetime.timedelta(seconds=(3600*ii))
            str_logic_time = logic_time.strftime("%H")
            str_time = logic_time.strftime("%Y-%m-%dT%H:%M:%SZ")

            for i in range(len(list_Track_Time)):

                if int(list_Track_Time[i][11:13]) == int(str_logic_time):


                    if list_vihicle_type[i] == list_type_Vehicle[0]:
                        sub_car_count += 1

                    elif list_vihicle_type[i] == list_type_Vehicle[1]:
                        sub_truck_count += 1

                    else:
                        sub_motorbike_count += 1
                
            sub_total_vehicle_value = (sub_car_count+sub_motorbike_count+sub_truck_count)

            data_json_each_hour ={
                f"gate{nature_gate}":gate_number,
                f"time{nature_gate}": str_time,
                "sumcar":sub_car_count,
                "sumtruck":sub_truck_count,
                "summotorbike":sub_motorbike_count,
                "sum": sub_total_vehicle_value
                }
            list_data_each_hour.append(data_json_each_hour)

    def process_texts(text, classname):
        if classname == "motorbike":

            def check_string_M(text):
                first_three = text[:3]
                middle_four = text[3:8]

                if all(char.isdigit() or 'ก' <= char <= 'ฮ' or char == ' ' for char in first_three):
                    if all(char.isdigit() or char == ' ' for char in middle_four):
                        return text
                    else:
                        return "miss"
                else:
                    if all(char.isdigit() or char == ' ' for char in middle_four):
                        return "---" + middle_four
                    else:
                        return "miss"

            filtered_text = ''
            for char in text:
                if char.isdigit() or 'ก' <= char <= 'ฮ':               
                    filtered_text += char
            if filtered_text and filtered_text[-3:].isdigit():
                return check_string_M(filtered_text)
            else:
                return 'miss'

        else:

            def check_string_CT(text):
                first_three = text[:3]
                middle_four = text[3:8]

                if all(char.isdigit() or 'ก' <= char <= 'ฮ' or char == ' ' for char in first_three):
                    if all(char.isdigit() or char == ' ' for char in middle_four):
                        return text
                    else:
                        return "miss"
                else:
                    if all(char.isdigit() or char == ' ' for char in middle_four):
                        return "---" + middle_four
                    else:
                        return "miss"

            filtered_text = ''
            for char in text:
                if char.isdigit() or 'ก' <= char <= 'ฮ':               
                    filtered_text += char
            if filtered_text and filtered_text[-3:].isdigit():
                result = check_string_CT(filtered_text)
            else:
                result = 'miss'

            if result.isdigit() and len(result) > 4:
                return result[-4:]
            elif all('ก' <= char <= 'ฮ' for char in result[:3]):
                digits = ''.join(filter(str.isdigit, result))
                return digits[-4:] if len(digits) >= 4 else digits
            else:
                return result

    
    def APPEND_LPR_OCR(track_id,class_name,textocr_use):

        data_dect = {f"{class_name}_id{track_id}":f"{textocr_use}"}

        if f"{class_name}_id{track_id}" not in list_ID:

            list_ID.append(f"{class_name}_id{track_id}")

        if data_dect not in list_total_LPR_in_video_OCR:
            
            list_total_LPR_in_video_OCR.append(data_dect)

    def APPEND_LPR(track_id,class_name,textocr_use,list_result):

        data_dect = {f"{class_name}_id{track_id}":f"{textocr_use}"}

        if data_dect not in list_result:
            
            list_result.append(data_dect)

    def Encodeing(class_name_LPR):
        if class_name_LPR == "A00":
            name = "ก"
        elif class_name_LPR == "A01":
            name = "ข"
        elif class_name_LPR == "A02":
            name = "ฃ"
        elif class_name_LPR == "A03":
            name = "ค"
        elif class_name_LPR == "A04":
            name = "ฅ"
        elif class_name_LPR == "A05":
            name = "ฆ"
        elif class_name_LPR == "A06":
            name = "ง"
        elif class_name_LPR == "A07":
            name = "จ"
        elif class_name_LPR == "A08":
            name = "ฉ"
        elif class_name_LPR == "A09":
            name = "ช"
        elif class_name_LPR == "A10":
            name = "ซ"
        elif class_name_LPR == "A11":
            name = "ฌ"
        elif class_name_LPR == "A12":
            name = "ญ"
        elif class_name_LPR == "A13":
            name = "ฎ"
        elif class_name_LPR == "A14":
            name = "ฏ"
        elif class_name_LPR == "A15":
            name = "ฐ"
        elif class_name_LPR == "A16":
            name = "ฑ"
        elif class_name_LPR == "A17":
            name = "ฒ"
        elif class_name_LPR == "A18":
            name = "ณ"
        elif class_name_LPR == "A19":
            name = "ด"
        elif class_name_LPR == "A20":
            name = "ต"
        elif class_name_LPR == "A21":
            name = "ถ"
        elif class_name_LPR == "A22":
            name = "ท"
        elif class_name_LPR == "A23":
           name = "ธ"
        elif class_name_LPR == "A24":
            name = "น"
        elif class_name_LPR == "A25":
            name = "บ"
        elif class_name_LPR == "A26":
            name = "ป"
        elif class_name_LPR == "A27":
            name = "ผ"
        elif class_name_LPR == "A28":
            name = "ฝ"
        elif class_name_LPR == "A29":
            name = "พ"
        elif class_name_LPR == "A30":
            name = "ฟ"
        elif class_name_LPR == "A31":
            name = "ภ"
        elif class_name_LPR == "A32":
            name = "ม"
        elif class_name_LPR == "A33":
            name = "ย"
        elif class_name_LPR == "A34":
            name = "ร"
        elif class_name_LPR == "A35":
            name = "ล"
        elif class_name_LPR == "A36":
            name = "ว"
        elif class_name_LPR == "A37":
            name = "ศ"
        elif class_name_LPR == "A38":
            name = "ษ"
        elif class_name_LPR == "A39":
            name = "ส"
        elif class_name_LPR == "A40":
            name = "ห"
        elif class_name_LPR == "A41":
            name = "ฬ"
        elif class_name_LPR == "A42":
            name = "อ"
        elif class_name_LPR == "A43":
            name = "ฮ"
        else :
            name = class_name_LPR
        return(name)
    
    def SORT_DATA(list_total_LPR_in_video): 
        data_dict_LP = {f"{i}":[] for  i in list_ID}
        data_results = {}
        list_last_result_LPR = []

        for i in list_ID:
            for ii in list_total_LPR_in_video:
                for key,value in ii.items():
                    if key == i:
                        data_dict_LP[key].append(value)
        replacements = {" ": "", "เ": "1", "า": "ว", "ไ": "1", "_": "","!": "1","ฺ":"","|":"","้":"","ั":""}
        for keys,values in data_dict_LP.items():
            values = ["".join(replacements.get(char,char) for char in element) for element in values]
            data_results[keys] = list(set(values))

        #test_count_LPR = 0
        #To_LPR = {"gate":"P4_OUT_REAL"}
        for i in list_id_counting:
            for key,value in data_results.items():
                if i == key:
                    list_last_result_LPR.append(data_results[i])
                    #To_LPR[f"{i}_Vihecle{test_count_LPR+1}"] = list_last_result_LPR[test_count_LPR]
                    #test_count_LPR += 1
                    #EXPORT2MOGODB(To_LPR,"test","LPR"
        return(list_last_result_LPR)
    
    reader = easyocr.Reader(['th'],gpu=True)
    conf_threshold = 0.5
    max_cosine_distance = 0.4
    conf_threshold_LP = 0.02
    nn_budget = None
    points = [deque(maxlen=32) for _ in range(5000)] # list of deque s to store the points
    points_REC = [deque(maxlen=32) for _ in range(5000)]
    total_vehicle_value = 0
    car_count = 0
    truck_count = 0
    motorbike_count = 0
    count = 0
    
    list_type_Vehicle = ["car","truck",'motorbike']
    list_vihicle_type=[]
    reading_result=[]
    list_Track_Time = []
    list_Track_Time_for_rename = []
    list_LPR=[]
    list_car_LPR,list_truck_LPR,list_motorbike_LRP = [],[],[]
    list_car_ID,list_motorbike_ID,list_truck_ID = [],[],[]
    list_img_base64 = []
    list_car_track_time,list_motorbike_track_time,list_truck_track_time = [], [], []
    area = []
    list_LPR_real=[]
    list_data_each_hour = []

    list_total_LPR_in_video_OCR = []
    list_total_LPR_in_video_AI = []
    list_sub_LPR_in_video_AI = []
    list_sub_LPR_in_video_OCR = []
    list_in_area = []
    list_id_counting = []
    list_ID = []
    dict_track = {}
 
    textocr_use=" "
    text_LPR_AI=" "

    area_p1_in = [(1027, 387),(286, 457),(335, 612),(1157, 445)]
    area_p1_out = [(1300,400),(261,476),(285, 646),(1400, 503)]     
    area_p2_in = [(1280,296),(0,260),(0,480),(1280,480)]
    area_p2_out =[(1400,152),(0,84),(0,206),(1400,292)]
    area_p3_in =[(1400,486),(0,648),(0,720),(1400,720)]
    area_p3_out =[(1400,295),(0,468),(0,590),(1400,382)]
    #area_p4_in =[(1008,158),(543,143),(397,236),(1223,272)]
    area_p4_in =[(1008,158),(543,143),(461,199),(1133,220)]
    area_p4_out= [(1400,389),(760,228),(604,310),(1400,545)]#[(ขวาบน),(ซ้ายบน),(ซ้ายล้าง),(ขวาล้าง)]

    area_p1_in_REC = [(1112, 427),(323, 575),(369, 1100),(1650, 594)]
    area_p1_out_REC = [(1279, 404),(281, 620),(292, 719),(1300,720)]
    area_p2_in_REC = [(1113,249),(901,629),(170,620),(1280,720)]
    area_p2_out_REC =[(1280,152),(0,84),(0,220),(1280,700)]
    area_p3_in_REC =[(1400,380),(0,503),(0,720),(1400,720)]
    area_p3_out_REC =[(1400,320),(0,450),(0,690),(1400,490)]
    area_p4_in_REC =[(1056,182),(206,97),(100,196),(1800,631)]
    area_p4_out_REC= [(1400,274),(730,163),(590,264),(1400,653)]
    nature_gate = nature_gate_in#need
    gate_number = gate_number_in #need

    if nature_gate == "in" :
        if gate_number == 1:
            area = area_p1_in
            area_REC = area_p1_in_REC
        elif gate_number == 2:
            area = area_p2_in
            area_REC = area_p2_in_REC
        elif gate_number == 3:
            area = area_p3_in
            area_REC = area_p3_in_REC
        else:
            area = area_p4_in
            area_REC = area_p4_in_REC

    elif nature_gate == "out":
        if gate_number == 1:
            area = area_p1_out
            area_REC = area_p1_out_REC
        elif gate_number == 2:
            area = area_p2_out
            area_REC = area_p2_out_REC
        elif gate_number == 3:
            area = area_p3_out
            area_REC = area_p3_out_REC
        else:
            area = area_p4_out
            area_REC = area_p4_out_REC

    year = int(intime[0:4])
    month = int(intime[5:7])
    day = int(intime[8:10])
    hour= int(intime[11:13])
    min = int(intime[14:16])
    sec = int(intime[17:19])
    H0,M0,S0 = [hour,min,sec]
    S_main = (H0 * 3600) + (M0 * 60) + (S0)

    #name_file_video = r"C:\Detector car new\Counting\mern-crud-master\uploads\test1.mp4"#need
    video_data = request.files['video']   
    # บันทึกวิดีโอลงในโฟลเดอร์ uploads
    video_path = os.path.join(UPLOAD_FOLDER, "VideoUpload.mp4")
    video_data.save(video_path)

    castom_start_time = datetime.datetime(year,month,day,H0,M0,S0)
    format_start_time = castom_start_time.strftime("%Y-%m-%dT%H:%M:%SZ")
    model_filename = r"config/mars-small128.pb"
    encoder = gdet.create_box_encoder(model_filename, batch_size=1)
    metric = nn_matching.NearestNeighborDistanceMetric(
        "cosine", max_cosine_distance, nn_budget)
    metric_LP = nn_matching.NearestNeighborDistanceMetric(
        "cosine", max_cosine_distance, nn_budget)
    tracker = Tracker(metric)
    tracker_LP = Tracker(metric_LP)######################################################
    # load the COCO class labels the YOLO model was trained on
    classes_path = "config/coco.names"
    with open(classes_path, "r") as f:
        class_names = f.read().strip().split("\n")
    classes_path_LPR = "config/cocotest.names"
    with open(classes_path_LPR, "r") as f:
        class_names_LPR = f.read().strip().split("\n")
        
    # create a list of random colors to represent each class
    np.random.seed(42)  # to get the same colors
    colors = np.random.randint(0, 255, size=(len(class_names), 3))  # (80, 3)

    video_cap = cv2.VideoCapture(video_path)
    area = ADJUST_DETECT_AREA(area,video_cap)######################################################-------------------------------------------------------
    area_REC = ADJUST_DETECT_AREA(area_REC,video_cap)
    fps = video_cap.get(cv2.CAP_PROP_FPS)
    frame_count = video_cap.get(cv2.CAP_PROP_FRAME_COUNT)
    duration = frame_count/fps

    #VIEO_END_TIME = S_main + duration
    format_end_time = VEHICLE_TRACKING_TIME(duration)

    writer = CREATE_VEDIO_WRITER(video_cap, r"D:\backup_counting\Counting\Output\output101.mp4")
    model = YOLO("yolov8x.pt")#ตัวแปรmodelคือวัตถุ YOLOv8 ที่เราจะใช้ตรวจจับวัตถุในวิดีโอ
    model_LP = YOLO("LPR_train_by_MrS101.pt")
    model_LPR = YOLO("best140.pt")
    #cv2.namedWindow("FRAME")
    #cv2.setMouseCallback("FRAME",POINTS)

    while True:
        
        ret, frame = video_cap.read()
        timeing = video_cap.get(cv2.CAP_PROP_POS_MSEC) #เป็นการใช้งาน OpenCV ใน Python ในการอ่านค่าเวลาปัจจุบันของเฟรมที่ถูกแสดงในวิดีโอที่เปิดอยู่ในหน่วยมิลลิวินาที 
        second = int(timeing/1000)

        if not ret:
            print("End of the video file...NAJA")
            break
        overlay = frame.copy()
        # draw the lines
        #cv2.line(frame, start_line_A1, end_line_A1, (0, 255, 0), 12)
        #frame = cv2.addWeighted(overlay, 0.5, frame, 0.5, 0)
        results = model(frame)        
        for result in results:
            
            bboxes = []
            confidences = []
            class_ids = []
        
            for data in result.boxes.data.tolist():#เราใช้result.boxes.data.tolist()เพื่อรับการตรวจจับในรูป[x1, y1, x2, y2, confidence, class_id]
                x1, y1, x2, y2, confidence, class_id = data #x1,y1 = ซ้ายบน/x2,y2 = ซ้ายบน
                x = int(x1)
                y = int(y1)
                w = int(x2)-int(x1)
                h = int(y2)-int(y1)
                class_id = int(class_id)
                N = class_names[class_id]
                
                if confidence > conf_threshold and N in list_type_Vehicle:
                    bboxes.append([x, y, w, h])
                    confidences.append(confidence)
                    class_ids.append(class_id)
                    #cv2.rectangle(frame, (x, y), (w,h), (0, 255, 0), 2)
                    #cv2.circle(frame,(w,h),3,(0,0,255),-1)

        ############################################################
        ### Track the objects in the frame using DeepSort        ###
        ############################################################
        # get the names of the detected objects
        names = [class_names[class_id] for class_id in class_ids]
        
        # get the features of the detected objects
        features = encoder(frame, bboxes)
        # convert the detections to deep sort format
        dets = []
        for bbox, conf, class_name, feature in zip(bboxes, confidences, names, features):
            dets.append(Detection(bbox, conf, class_name, feature))
        # run the tracker on the detections
        tracker.predict()
        tracker.update(dets)
        

        # loop over the tracked objects
        for track in tracker.tracks:
            if not track.is_confirmed() or track.time_since_update > 1:
                continue
            # get the bounding box of the object, the name
            # of the object, and the track id
            bbox = track.to_tlbr()
            track_id = track.track_id
            class_name = track.get_class()
            # convert the bounding box to integers
            x1, y1, x2, y2 = int(bbox[0]), int(bbox[1]), int(bbox[2]), int(bbox[3])
            
            # get the color associated with the class name
            class_id = class_names.index(class_name)
            color = colors[class_id]
            B, G, R = int(color[0]), int(color[1]), int(color[2])

            x1_C,y1_C,x2_C,y2_C = x1, y1, x2, y2

            if x2 > video_cap.get(cv2.CAP_PROP_FRAME_WIDTH):
                x2_C = int(video_cap.get(cv2.CAP_PROP_FRAME_WIDTH))
            if y2 >video_cap.get(cv2.CAP_PROP_FRAME_HEIGHT):
                y2_C = int(video_cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
            if x1 < 0:
                x1_C = 0
            if y1 < 0:
                y1_C = 0

            results_LP = model_LP(frame[y1_C:y2_C,x1_C:x2_C])

            for result_LP in results_LP:
                
                if result_LP.boxes.data.tolist() == [] :
                    textocr = "OCR_cant_dectec"
                    textocr_use = f"{textocr}"
                    text_LPR_AI = "AI_cant_dectec"
                    APPEND_LPR(track_id,class_name,text_LPR_AI,list_total_LPR_in_video_AI)
                    APPEND_LPR_OCR(track_id,class_name,textocr_use)
                    frame = SHOW_THAI_LANG(frame,x1,y2,textocr_use)
                    frame = SHOW_THAI_LANG(frame,((x1+x2)/2),y2,text_LPR_AI)
                    
                    
            
                for data_LP in result_LP.boxes.data.tolist():#เราใช้result.boxes.data.tolist()เพื่อรับการตรวจจับในรูป[x1, y1, x2, y2, confidence, class_id]
                    
                    x1_LP, y1_LP, x2_LP, y2_LP, confidence_LP, class_id_LP = data_LP#x1,y1 = ซ้ายบน/x2,y2 = ซ้ายบน
                    int_x1_LP = int(x1_LP)
                    int_x2_LP = int(x2_LP)
                    int_y1_LP = int(y1_LP)
                    int_y2_LP = int(y2_LP)

                    results_LPR = model_LPR(frame[y1_C:y2_C,x1_C:x2_C][int_y1_LP:int_y2_LP,int_x1_LP:int_x2_LP])

                    text_LPR_AI = ""
                    list_for_sort = []
                    dict_for_sort = {}

                    for result_LPR in results_LPR: 

                        if result_LPR.boxes.data.tolist() == [] :
                            text_LPR_AI = "AI_cant_dectec"

                            APPEND_LPR(track_id,class_name,text_LPR_AI,list_total_LPR_in_video_AI)
                            frame = SHOW_THAI_LANG(frame,((x1+x2)/2),y2,text_LPR_AI)
                              

                        for data_LPR in result_LPR.boxes.data.tolist():#เราใช้result.boxes.data.tolist()เพื่อรับการตรวจจับในรูป[x1, y1, x2, y2, confidence, class_id]
                            
                            x1_LPR, y1_LPR, x2_LPR, y2_LPR, confidence_LPR, class_id_LPR = data_LPR#x1,y1 = ซ้ายบน/x2,y2 = ซ้ายบน
                            int_x1_LPR = int(x1_LPR)
                            int_x2_LPR = int(x2_LPR)
                            int_y1_LPR = int(y1_LPR)
                            int_y2_LPR = int(y2_LPR)
                            class_id_LPR = int(class_id_LPR)
                            class_name_LPR = class_names_LPR[class_id_LPR]
                            class_name_LPR = Encodeing(class_name_LPR)
            
                             
                            #if class_name_LPR != "provide":
                            if class_name == "motorbike":
                                list_for_sort.append((int_x1_LPR,int_y1_LPR))
                                dict_for_sort[(int_x1_LPR,int_y1_LPR)] = class_name_LPR
                            else:
                                dict_for_sort[int_x1_LPR] = class_name_LPR

                        if class_name == "motorbike":
                            avg_y = np.average([list_for_sort[i][1] for i in range(len(list_for_sort))])

                            label = []
                            num = []
                            for i in range(len(list_for_sort)):
                                data_xy = list_for_sort[i]
                                if data_xy[1] < avg_y:
                                    label.append(data_xy)
                                else:
                                    num.append(data_xy)

                            label = sorted(label,key=lambda p: p[0])
                            num = sorted(num,key=lambda p: p[0])

                            label.extend(num)

                            for i in label:
                                text_LPR_AI = f"{text_LPR_AI}{dict_for_sort[i]}"

                            text_LPR_AI=text_LPR_AI.replace(" ","")
                            
                        else:

                            for key,value in dict_for_sort.items():
                                list_for_sort.append(key)
                            list_for_sort.sort()

                            for i in list_for_sort:
                                text_LPR_AI = f"{text_LPR_AI}{dict_for_sort[i]}"
                                
                            text_LPR_AI=text_LPR_AI.replace(" ","")
                             
                        frame = SHOW_THAI_LANG(frame,((x1+x2)/2),y2,text_LPR_AI)  
                        APPEND_LPR(track_id,class_name,text_LPR_AI,list_total_LPR_in_video_AI)

                    frame_gray = cv2.cvtColor(overlay[y1_C:y2_C,x1_C:x2_C],cv2.COLOR_BGR2GRAY)
                    reading_result = reader.readtext(frame_gray[int_y1_LP:int_y2_LP,int_x1_LP:int_x2_LP])

                    if class_name == "motorbike":

                        textocr_use_motorbike = ""

                        if len(reading_result) == 3:
                            reading_result = [reading_result[0],reading_result[2]]

                        elif len(reading_result) == 2:
                            reading_result = [reading_result[0],reading_result[1]]

                        elif len(reading_result)==0:
                            reading_result = [([],"Miss",-1)]

                        else :
                            reading_result = reading_result

                        for detection in reading_result:
                            bboxocrs,textocrs,confocrs=detection

                            textocr_use_motorbike = f"{textocr_use_motorbike}{textocrs}" #+" conf "+f"{confocr:.2f}" 
                            textocr_use = textocr_use_motorbike
                        frame = SHOW_THAI_LANG(frame,x1,y2,textocr_use)
                            
                        APPEND_LPR_OCR(track_id,class_name,textocr_use)

                    else:

                        if len(reading_result)>=1:
                            reading_result = [reading_result[0]]

                        elif len(reading_result)==0:
                            reading_result = [([],"Miss",-1)]

                        else:
                            reading_result = reading_result

                        for detection in reading_result:
                            bboxocrs,textocrs,confocrs=detection
                            
                            if len(reading_result) == 1 and confocrs > conf_threshold_LP:
                                textocr = textocrs
                                confocr = confocrs
                            else :
                                textocr = "Miss"
                                confocr = confocrs

                            textocr_use = f"{textocr}" #+" conf "+f"{confocr:.2f}"
                        frame = SHOW_THAI_LANG(frame,x1,y2,textocr_use)
                            
                        APPEND_LPR_OCR(track_id,class_name,textocr_use)

            # draw the bounding box of the object, the name
            # of the predicted object, and the track id
            
            #img_gray = cv2.cvtColor(overlay[y1:y2,x1:x2],cv2.COLOR_BGR2GRAY)
            text = str(track_id) + " - " + class_name 
            cv2.rectangle(frame, (x1, y1), (x2, y2), (B, G, R), 3)
            cv2.rectangle(frame, (x1 - 1, y1 - 20),(x1 + (len(text)) * 12, y1), (B, G, R), -1)
            cv2.putText(frame, text, (x1 + 5, y1 - 8),cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 255), 2)
            
                
            ############################################################
            ### Count the number of vehicles passing the lines       ###
            ############################################################
            center_x = int((x1 + x2) / 2)
            center_y = int((y1 + y2) / 2)
            right_down_x = x2
            right_down_y = y2
            # append the center point of the current object to the points list
            #points[track_id].append((center_x, center_y))
            points[track_id].append((right_down_x,right_down_y))
            points_REC[track_id].append((right_down_x,right_down_y))
            #cv2.circle(frame, (center_x, center_y), 4, (0,255,0), -1) 
            #cv2.circle(frame,(right_down_x,right_down_y),(4),(0,0,255),-1)    

            # # loop over the set of tracked points and draw them
            # for i in range(0, len(points_REC[track_id])):
            #     point1 = points_REC[track_id][i - 1]
            #     point2 = points_REC[track_id][i]

            #     # if the previous point or the current point is None, do nothing
            #     if point1 is None or point2 is None:
            #         continue
            #     cv2.line(frame, (point1), (point2), (0, 255, 0), 2)
            
            # get the last point from the points list and draw it
            last_point_x = points[track_id][0][0]
            last_point_y = points[track_id][0][1]
            last_point_x_REC = points_REC[track_id][0][0]
            last_point_y_REC = points_REC[track_id][0][1]
            #cv2.circle(frame, (int(last_point_x), int(last_point_y)), 4, (255, 0, 255), -1)   

            #TOTAL_SECOND_IN_FRAME = second + S_main 
            
            #center_in_area = cv2.pointPolygonTest(np.array(area_p1_in,np.int32),(center_x,center_y),False)
            lower_right_in_area_count = cv2.pointPolygonTest(np.array(area,np.int32),(right_down_x,right_down_y),False)
            lastPoint_out_area_count = cv2.pointPolygonTest((np.array(area,np.int32)),(last_point_x,last_point_y),False)

            lower_right_in_area_REC_LP = cv2.pointPolygonTest(np.array(area_REC,np.int32),(right_down_x,right_down_y),False)
            lastPoint_out_area_REC_LP = cv2.pointPolygonTest(np.array(area_REC,np.int32),(last_point_x_REC,last_point_y_REC),False)

            if lower_right_in_area_count == 1 and lastPoint_out_area_count == -1 :
            
                total_vehicle_value += 1

                if class_name == "motorbike":
                    motorbike_count += 1
                    
                    image_motorbike_filename = r"D:\backup_counting\Counting\image\Vihecle_%s.jpg"%total_vehicle_value
                    cv2.imwrite(image_motorbike_filename,overlay[y1:y2,x1:x2])
                    #image_motorbike_filename_LP = r"D:\backup_counting\Counting\image\Vihecle_LPR_%s.jpg"%total_vehicle_value
                    #cv2.imwrite(image_motorbike_filename_LP,overlay[y1_C:y2_C,x1_C:x2_C][int_y1_LP:int_y2_LP,int_x1_LP:int_x2_LP])
                    format_track_time = VEHICLE_TRACKING_TIME(second)
                    format_track_time_for_rename = VEHICLE_TRACKING_TIME_for_rename(second)
                    list_id_counting.append(f"{class_name}_id{track_id}")
                    list_motorbike_ID.append(track_id)
                    list_motorbike_track_time.append(format_track_time)
                    list_vihicle_type.append(class_name)
                    img2str = CREATE_IMG2STR(image_motorbike_filename)
                    list_img_base64.append(img2str)
                         

                elif class_name == "car":
                    car_count += 1
                    image_car_filename = r"D:\backup_counting\Counting\image\Vihecle_%s.jpg"%total_vehicle_value
                    cv2.imwrite(image_car_filename,overlay[y1:y2,x1:x2])
                    format_track_time = VEHICLE_TRACKING_TIME(second)
                    format_track_time_for_rename = VEHICLE_TRACKING_TIME_for_rename(second)
                    list_id_counting.append(f"{class_name}_id{track_id}")
                    list_car_ID.append(track_id)
                    list_car_track_time.append(format_track_time)
                    list_vihicle_type.append(class_name)
                    img2str = CREATE_IMG2STR(image_car_filename)
                    list_img_base64.append(img2str)
                 

                elif class_name == "truck":
                    truck_count += 1

                    image_truck_filename = r"D:\backup_counting\Counting\image\Vihecle_%s.jpg"%total_vehicle_value
                    cv2.imwrite(image_truck_filename,overlay[y1:y2,x1:x2])
                    format_track_time = VEHICLE_TRACKING_TIME(second)
                    format_track_time_for_rename = VEHICLE_TRACKING_TIME_for_rename(second)
                    list_id_counting.append(f"{class_name}_id{track_id}")
                    list_truck_ID.append(track_id)
                    list_truck_track_time.append(format_track_time)
                    list_vihicle_type.append(class_name)
                    img2str = CREATE_IMG2STR(image_truck_filename)
                    list_img_base64.append(img2str)
        

                list_Track_Time.append(format_track_time)     
                list_Track_Time_for_rename.append(format_track_time_for_rename) 
                points[track_id].clear()
            
            if lower_right_in_area_REC_LP == 1 and lastPoint_out_area_REC_LP == -1:

                if class_name == "motorbike":
                    list_in_areas = [textocr_use.replace(" ",""),f"{text_LPR_AI}"]
                    dict_track[f"{class_name}_id{track_id}"] =  list_in_areas
                    list_in_area.append(list_in_areas)
                    

                elif class_name == "car":
                    list_in_areas = [textocr_use.replace(" ",""),f"{text_LPR_AI}"]
                    dict_track[f"{class_name}_id{track_id}"] =  list_in_areas
                    list_in_area.append(list_in_areas)
                    # image_car_filename_LP = r"D:\backup_counting\Counting\image\Vihecle_LPR_%s.jpg"%total_vehicle_value
                    # cv2.imwrite(image_car_filename_LP,overlay[y1_C:y2_C,x1_C:x2_C][int_y1_LP:int_y2_LP,int_x1_LP:int_x2_LP])

                elif class_name == "truck":
                    list_in_areas = [textocr_use.replace(" ",""),f"{text_LPR_AI}"]
                    dict_track[f"{class_name}_id{track_id}"] =  list_in_areas
                    list_in_area.append(list_in_areas)
                    # image_truck_filename_LP = r"D:\backup_counting\Counting\image\Vihecle_LPR_%s.jpg"%total_vehicle_value
                    # cv2.imwrite(image_truck_filename_LP,overlay[y1_C:y2_C,x1_C:x2_C][int_y1_LP:int_y2_LP,int_x1_LP:int_x2_LP])

                points_REC[track_id].clear()

            elif lower_right_in_area_REC_LP == 1 and lastPoint_out_area_REC_LP == 1:
                APPEND_LPR(track_id,class_name,textocr_use,list_sub_LPR_in_video_OCR)
                APPEND_LPR(track_id,class_name,text_LPR_AI,list_sub_LPR_in_video_AI)
        
        cv2.putText(frame,"%d"%second,(94,365),cv2.FONT_HERSHEY_SIMPLEX,0.5,(0,0,0),2)      
        cv2.polylines(frame,[np.array(area,np.int32)],(True),(255,0,0),2)
        cv2.polylines(frame,[np.array(area_REC,np.int32)],True,(100, 150, 150),2)            
        cv2.putText(frame, "P4", (65, 344), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 255), 2)
        cv2.putText(frame, str(total_vehicle_value), (94, 345), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 255), 2)
        cv2.imshow("FRAME",frame)
        writer.write(frame)
        
        if cv2.waitKey(1)&0xFF == ord("q"):
            break



    video_cap.release()
    writer.release()
    cv2.destroyAllWindows()

    list_data_result_OCR = SORT_DATA(list_total_LPR_in_video_OCR)
    list_data_result_AI = SORT_DATA(list_total_LPR_in_video_AI)
    list_sub_data_result_OCR = SORT_DATA(list_sub_LPR_in_video_OCR)
    list_sub_data_result_AI = SORT_DATA(list_sub_LPR_in_video_AI)

    result_loss_value = []
    if len(list_in_area) < len(list_vihicle_type):
        loss_key = [i for i in list_id_counting if i not in list(dict_track)]
        for i in loss_key:
            dict_track[i] = ["Ocr_cant_dectec","AI_cant_dectec"]

        replacements = {" ": "", "เ": "1", "า": "ว", "ไ": "1", "_": "","!": "1","ฺ":"","|":"","้":"","ั":""}
        for keys,values in dict_track.items():
            values = ["".join(replacements.get(char,char) for char in element) for element in values]
            dict_track[keys] = list(set(values))

        for i in list_id_counting:
            for key,value in dict_track.items():
                if i == key:
                    result_loss_value.append(dict_track[i])
        list_in_area = result_loss_value
 
    else:
        replacements = {" ": "", "เ": "1", "า": "ว", "ไ": "1", "_": "","!": "1","ฺ":"","|":"","้":"","ั":""}
        list_in_area = [["".join(replacements.get(char,char)for char in element) for element in i ]for i in list_in_area]
    
    
    list_last_result_LPR = []


    for list_ocr,list_AI,list_area,list_sub_ocr,list_sub_AI,type in zip(list_data_result_OCR,list_data_result_AI,list_in_area,list_sub_data_result_OCR,list_sub_data_result_AI,list_vihicle_type):
        
        if type == "car":
            pattern1 = re.compile(r"^[ก-๙]{2}\d{1,4}$")
            pattern2 = re.compile(r"^\d{1}[ก-๙]{2}\d{1,4}$")
            list_ocr = [item for item in list_ocr if pattern1.match(item) or pattern2.match(item)]
            list_AI = [item for item in list_AI if pattern1.match(item) or pattern2.match(item)]
            list_sub_ocr = [item for item in list_sub_ocr if pattern1.match(item) or pattern2.match(item)]
            list_sub_AI = [item for item in list_sub_AI if pattern1.match(item) or pattern2.match(item)]
        elif type == "motorbike":
            pattern1 = re.compile(r"^[ก-๙]{3}\d{1,4}$")
            pattern2 = re.compile(r"^\d{1}[ก-๙]{2}\d{1,4}$")
            list_ocr = [item for item in list_ocr if pattern1.match(item) or pattern2.match(item)]
            list_AI = [item for item in list_AI if pattern1.match(item) or pattern2.match(item)]
            list_sub_ocr = [item for item in list_sub_ocr if pattern1.match(item) or pattern2.match(item)]
            list_sub_AI = [item for item in list_sub_AI if pattern1.match(item) or pattern2.match(item)] 
        else:
            pattern1 = re.compile(r"^[ก-๙]{2}\d{1,4}$")
            pattern2 = re.compile(r"^\d{1}[ก-๙]{2}\d{1,4}$")
            pattern3 = re.compile(r"^\d{6}&")
            list_ocr = [item for item in list_ocr if pattern1.match(item) or pattern2.match(item) or pattern3.match(item)]
            list_AI = [item for item in list_AI if pattern1.match(item) or pattern2.match(item) or pattern3.match(item)]
            list_sub_ocr = [item for item in list_sub_ocr if pattern1.match(item) or pattern2.match(item) or pattern3.match(item)]
            list_sub_AI = [item for item in list_sub_AI if pattern1.match(item) or pattern2.match(item) or pattern3.match(item)]

        
        inner_OCR_AI_subocr_subai = list(set(list_ocr) & set(list_AI) & set(list_sub_AI) & set(list_sub_ocr))
        inner_AI_subai = list(set(list_AI) & set(list_sub_AI))
        inner_AI_result = list( set(inner_AI_subai) & set(inner_OCR_AI_subocr_subai))
        print(f"{list_ocr}\n{list_AI}\n{list_sub_ocr}\n{list_sub_AI}\n{inner_OCR_AI_subocr_subai}\n---------\n{inner_AI_result}\n{inner_AI_subai}\n---------")

        if len(inner_OCR_AI_subocr_subai) == 1:
            result_filter = process_texts(inner_OCR_AI_subocr_subai[0],type)
            list_last_result_LPR.append(result_filter)
 
        elif len(inner_OCR_AI_subocr_subai) > 1:

            if len(inner_AI_subai) == 1 or len(inner_AI_result) == 1:

                if len(inner_AI_result) == 1:
                    list_last_result_LPR.append(inner_AI_result[0])
                elif len(inner_AI_subai) == 1:
                    list_last_result_LPR.append(inner_AI_subai[0])
            else:
                ans = process_texts(list_area[1],type)
                if ans == "miss":
                    ans = process_texts(list_area[0],type)
                    if ans == "miss":
                        list_last_result_LPR.append("miss")
                    else:
                        list_last_result_LPR.append(ans)
                else:
                    list_last_result_LPR.append(ans)
        else:

            if len(inner_AI_subai) == 1:
                list_last_result_LPR.append(inner_AI_subai[0])
            else:
                ans = process_texts(list_area[1],type)
                if ans == "miss":
                    ans = process_texts(list_area[0],type)
                    if ans == "miss":
                        list_last_result_LPR.append("miss")
                    else:
                        list_last_result_LPR.append(ans)
                else:
                    list_last_result_LPR.append(ans)\
                    
    print("-"*100)
    print(dict_track)
    print('Video start at %s'%format_start_time)
    print('Video end at %s'%format_end_time)
    print(list_Track_Time)
    print("total of vehicle value is %d" % total_vehicle_value)
    print("value of car %d"%car_count)
    print("Value of motorbike %d"%motorbike_count)
    print("Value of truck %d"%truck_count)
    print(list_vihicle_type)
    print(list_id_counting)
    print("-"*100)
    print(list_data_result_OCR)
    print(list_data_result_AI)
    print(list_sub_data_result_OCR)
    print(list_sub_data_result_AI)
    print(list_in_area)
    print(list_last_result_LPR)
    print("-"*100)  
 
    if nature_gate_in ==  "in" :
        while count < len(list_vihicle_type):
            data1 =  {"vihecle_number":count+1,
                    "cartype": list_vihicle_type[count],
                    "licenseplatenumber": list_last_result_LPR[count],#รอแก้
                    "timein": list_Track_Time[count],
                    "timeout": "-",
                    "gatein": "%s"%gate_number,
                    "gateout": "-",
                    "__v": "-",
                    "base64":f"data:image/png;base64,{list_img_base64[count]}"}
            list_output.append(data1)
            count+=1

        
    
        ISOLATE(nature_gate_in,gate_number)    

    else :
        while count < len(list_vihicle_type):
            data1 =  {"vihecle_number":count+1,
                    "cartype": list_vihicle_type[count],
                    "licenseplatenumber": list_last_result_LPR[count],#รอแก้
                    "timein": "-",
                    "timeout": list_Track_Time[count],
                    "gatein": "-",
                    "gateout": "%s"%gate_number,
                    "__v": "-",
                    "base64":f"data:image/png;base64,{list_img_base64[count]}"}
            list_output.append(data1)
            count+=1
    
      
        ISOLATE(nature_gate_in,gate_number)
    list_output.append(list_data_each_hour)     

    status = {
        "loading": True
    }
    return (status)

@app.route('/api/dataA', methods=['GET'])
@cross_origin()
def get_all_vehicle_data():
    #test_out_json = {f"vehicle{i}":list_output[i] for i in range(len(list_output))}
    return (list_output)

@app.route('/api/dataA/<int:Vnum>', methods=['GET'])
@cross_origin()
def get_vehicle_data_by_num(Vnum):
    for data in list_output:
        if data["vihecle_number"] == Vnum:
            return(data)

@app.route('/api/dataA', methods=['DELETE'])
@cross_origin()
def delete_all_vehicle_data():
    global list_output  # เพื่อให้สามารถเข้าถึง list_output ที่ถูกสร้างขึ้นนอกขอบเขตของฟังก์ชันนี้ได้

    list_output.clear()  # เคลียร์ข้อมูลใน list_output ทั้งหมด
    image_directory = r"D:\backup_counting\Counting\image"

    # สแกนไฟล์ทั้งหมดใน directory ที่มีนามสกุล .jpg
    jpg_files = glob.glob(os.path.join(image_directory , '*.jpg'))

    # ลบไฟล์ที่พบ
    for jpg_file in jpg_files:
        os.remove(jpg_file)

    print("DELETE_file_jpg_successful")
    return (list_output)
    # หรือถ้าต้องการลบข้อมูลบางส่วนจาก list_output สามารถใช้การสร้าง list ใหม่โดยกรองข้อมูลที่ต้องการเก็บไว้ เช่น list_output = [item for item in list_output if เงื่อนไข]

@app.route("/api/delete/some_data/<int:Vnum>",methods=["DELETE"])
@cross_origin()
def delete_some_data(Vnum):
    pattern_time = re.compile(r"^time")
    
    for i in list_output:
        if type(i) == dict:
            if i["vihecle_number"] == Vnum:
                timeDATA = [values for keys,values in i.items() if pattern_time.match(keys) and (values != "-")]
                type_vihecle = i["cartype"]
                list_output.remove(i)
                continue
        
    for i in list_output:
        if type(i) == dict:
            if i["vihecle_number"] > Vnum:
                i["vihecle_number"] = int(i["vihecle_number"])-1
                i.update(i)
        else:
            for ii in i:
                key_of_date = [values for keys,values in ii.items() if pattern_time.match(keys)]
                if key_of_date[0][:13] == timeDATA[0][:13]:
                    filter_key = [result for result in ii.keys() if result == f"sum{type_vihecle}"]
                    ii[f"sum{type_vihecle}"] = int(ii[f"sum{type_vihecle}"])-1
                    ii[f"sum"] = int(ii[f"sum"])-1
                    if ii[f"sum"] == 0 :
                        i.remove(ii)
                    ii.update(ii)
    return(list_output)

@app.route('/api/dataA/<int:f>', methods=['PUT'])
@cross_origin()
def update_vehicle_data(f):
    edited_data = request.json
    for data in list_output:
        if data["vihecle_number"] == edited_data["vihecle_number"]:
            data.update(edited_data)
            break
    print(f"Edit_data_Vehicle_{f}_Succassful")
    return(list_output)

if __name__ == '__main__':
    app.run(debug=True)