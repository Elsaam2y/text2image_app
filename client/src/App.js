import {
  ChakraProvider,
  Heading,
  Container,
  Text,
  Input,
  Button,
  Wrap,
  Stack,
  Image,
  Link,
  SkeletonCircle,
  SkeletonText,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";

const App = () => {
  const [image, updateImage] = useState();
  const [prompt, updatePrompt] = useState();
  const [loading, updateLoading] = useState();

  //const generate = async (prompt) => {
  //  updateLoading(true);
  //  const result = await axios.get(`http://127.0.0.1:8000/?prompt=${prompt}`);
  //  updateImage(result.data);
  //  updateLoading(false);
  //};

  // const generate = async (prompt) => {
  //   updateLoading(true);
  //   try {
  //     const response = await axios.get(
  //       `http://127.0.0.1:8000/generate_response?prompt=${prompt}`
  //     );
  //     //updateImage(response.data);
  //     const decodedImage = atob(response.data);
  //     updateImage(decodedImage);
  //   } catch (error) {
  //     console.error(error);
  //     // Handle error
  //   } finally {
  //     updateLoading(false);
  //   }
  // };
  const generate = async (prompt) => {
    updateLoading(true);
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/generate_response?prompt=${prompt}`
      );
      updateImage(response.data.image); // Set the base64-encoded image data
    } catch (error) {
      console.error(error);
      // Handle error
    } finally {
      updateLoading(false);
    }
  };

  return (
    <ChakraProvider>
      <Container>
        <Heading>Text to Image React Application</Heading>
        <Text marginBottom={"10px"}>
          This application aims to utilize{" "}
          <Link
            href={"https://huggingface.co/stabilityai/stable-diffusion-2-1"}
            target="_blank"
            color="blue"
            fontWeight="bold"
          >
            stable diffusion v2
          </Link>{" "}
          and{" "}
          <Link
            href={"https://github.com/dome272/Paella"}
            target="_blank"
            color="green"
            fontWeight="bold"
          >
            Paella
          </Link>{" "}
          text-to-image models to generate images given an input text. For the
          latter, the model is being trained on a the{" "}
          <Link
            href={"https://huggingface.co/datasets/poloclub/diffusiondb"}
            target="_blank"
            color="red"
            fontWeight="bold"
          >
            diffusiondb
          </Link>{" "}
          dataset but with additional reward functions, as an approach to
          prioritize the utilization of CLIP image embeddings over prior
          model-generated embeddings, and achieve a better balance between the
          two embeddings (still under progress).
        </Text>

        <Wrap marginBottom={"10px"}>
          <Input
            value={prompt}
            onChange={(e) => updatePrompt(e.target.value)}
            width={"350px"}
          ></Input>
          <Button onClick={(e) => generate(prompt)} colorScheme={"yellow"}>
            Generate
          </Button>
        </Wrap>

        {loading ? (
          <Stack>
            <SkeletonCircle />
            <SkeletonText />
          </Stack>
        ) : image ? (
          <Image src={`data:image/png;base64,${image}`} boxShadow="lg" />
        ) : null}
      </Container>
    </ChakraProvider>
  );
};

export default App;
