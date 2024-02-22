import os
import json
def generate_json(directory):
    data = {
        "name": os.path.basename(directory),
        "parent": None,
        "children": []
    }
    
    for root, dirs, files in os.walk(directory):
        current_dir = {
            "name": os.path.basename(root),
            "parent": os.path.basename(os.path.dirname(root)),
            "children": []
        }
        for file in files:
            current_dir["children"].append({
                "name": file,
                "parent": os.path.basename(root),
                "size": os.path.getsize(os.path.join(root, file))
            })
        data['children'].append(current_dir)

    return data

# Example usage:
directory_path = "/Users/ch.sarun/Documents/MyCodes/Code/Projects/S360/s360-client/src"
result = generate_json(directory_path)
print(json.dumps(result, indent = 4))

