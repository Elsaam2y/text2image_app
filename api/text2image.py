import replicate
import requests
import os
from dotenv import load_dotenv

# Specify the path to the .env file
dotenv_path = "../.env"


# Load environment variables from the specified .env file
load_dotenv(dotenv_path)
# Load your API key from an environment variable or secret management service
REPLICATE_API_TOKEN = os.getenv("REPLICATE_API_TOKEN")

def generate_response(prompt):
    output = replicate.run(
    "stability-ai/stable-diffusion:db21e45d3f7023abc2a46ee38a23973f6dce16bb082a930b0c49861f96d1e5bf",
    input={"prompt": prompt}
    )
    print(output)

    # Send a GET request to the URL
    response = requests.get(output[0])
    # Check if the request was successful
    if response.status_code == 200:
        # Extract the filename from the URL
        filename = output[0].split("/")[-1]

        # Get the current working directory
        current_directory = os.getcwd()

        # Create the full path to save the image
        save_path = os.path.join(current_directory, filename)

        # Save the image in the current directory
        with open(save_path, "wb") as file:
            file.write(response.content)

        print(f"Image downloaded successfully: {save_path}")
    else:
        print(f"Failed to download image. Status Code: {response.status_code}")



# download_image(output[0])
if __name__ =="__main__":
    generate_response("beautiful sky")