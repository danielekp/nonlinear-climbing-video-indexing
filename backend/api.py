from flask import Flask, request, send_file, url_for
from flask_restful import Api, Resource
import json
import os

app = Flask(__name__)
api = Api(app)

data_directory = '../../data/'

class GetVideos(Resource):

    def post(self):
        url_list = []
        print(request.json)
        for filename in os.listdir(data_directory+request.json['image']+'/videoJson'):
            with open(os.path.join(data_directory+request.json['image']+'/videoJson', filename), 'r') as f:
                print(f)
                data = json.load(f)
                flag = 0
                for frame in data:
                    if not flag:
                        for people in data[frame]:
                            find = True
                            for joint in request.json['joints']:
                                if not people[joint*3]>request.json['x_origin'] or not people[joint*3+1]>request.json['y_origin']:
                                    find = False
                                elif not people[joint*3]<request.json['x_target'] or not people[joint*3+1]<request.json['y_target']:
                                    find = False
                            if find:
                                print(people)
                                url_list.append({'url': url_for('static', filename=filename[:-5]), 'frame': frame})
                                url_list.append({'url': url_for('static', filename=filename[:-5]), 'frame': frame})
                                flag = 1
                                break
                    else:
                        break
        return json.dumps(url_list)

api.add_resource(GetVideos, "/getvideos")

if __name__ == "__main__":
    app.run(debug=True)
