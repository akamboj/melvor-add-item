import json
import os
import stat
import zipfile

ARTIFACT_NAME = 'melvor-add-item'

VERSION_FILE = 'build\\build_ver.json'
VERSION_NUM_KEY = 'version_num'

ZIP_OUTPUT_DIR = 'output'
ZIP_FILE_IGNORE_LIST = {
    '.gitignore'
}


class BuildVersion:
    major = 1
    minor = 0
    patch = 0

    def __init__(self, version_str):
        version_arr = version_str.split('.')
        assert len(version_arr) == 3

        self.major = int(version_arr[0])
        self.minor = int(version_arr[1])
        self.patch = int(version_arr[2])

    def __str__(self) -> str:
        str = "{}.{}.{}".format(self.major, self.minor, self.patch)
        return str
        
def load_build_ver(file_name):
    with open(file_name) as build_json:
        data = json.load(build_json)
        build_ver = BuildVersion(data[VERSION_NUM_KEY])
        return build_ver

def save_build_ver(file_name, version):
    output_dict = {
        VERSION_NUM_KEY : str(version)
    }
    json_object = json.dumps(output_dict, indent=4)

    with open(VERSION_FILE, 'w') as file:
        file.write(json_object)
    

def create_zip(version):
    source_dir = os.getcwd();
    zip_name = "{}\\{}-v{}.zip".format(ZIP_OUTPUT_DIR, ARTIFACT_NAME, version)
    print("Writing zip to: {}\\{}".format(source_dir, zip_name))
    with zipfile.ZipFile(zip_name, 'w') as zip_file:
        # iterate root dir
        for file_obj in os.scandir(source_dir):
            if file_obj.is_file():
                var = file_obj.path
                is_hidden = os.stat(file_obj.path).st_file_attributes & stat.FILE_ATTRIBUTE_HIDDEN
                if not is_hidden and file_obj.name not in ZIP_FILE_IGNORE_LIST:
                    relative_path = os.path.relpath(file_obj.path, source_dir)
                    zip_file.write(file_obj.path, relative_path)
        

def main():
    build_ver = load_build_ver(VERSION_FILE)
    print("Current version: {}".format(build_ver))

    build_ver.patch += 1

    print("Incrementing version to: {}".format(build_ver))
    create_zip(build_ver)
    save_build_ver(VERSION_FILE, build_ver)


if __name__ == "__main__":
    main()

