import os

def get_files_in_directory(directory):
    # Ensure the directory exists
    if not os.path.exists(directory):
        print(f"Directory does not exist: {directory}")
        return []
    
    # Ensure it's a directory
    if not os.path.isdir(directory):
        print(f"Provided path is not a directory: {directory}")
        return []

    # List files in the directory
    files = os.listdir(directory)
    
    # Filter out directories (optional, if you only want files)
    files = [f for f in files if os.path.isfile(os.path.join(directory, f))]
    
    # If there are no files, return an empty list
    if not files:
        print("No files found in the directory.")
        return []

    # Return a list of the file names
    return files

# Set the directory path (using raw string for Windows paths)
directory = r'C:\Users\User\web-proj\avengerz\public\assets\services\paintcurr'  # Replace with the correct path

# Call the function and get the list of file names
images = get_files_in_directory(directory)

# Output the result
print("Images list:")
print(images)
