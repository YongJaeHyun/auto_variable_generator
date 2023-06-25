import {
  Box,
  Button,
  Card,
  CardBody,
  Center,
  Divider,
  Flex,
  Heading,
  Icon,
  Spinner,
  Stack,
  StackDivider,
  Text,
  Textarea,
  ToastId,
  ToastPosition,
  useToast,
} from "@chakra-ui/react";
import Header from "./components/Header";
import { useRef, useState } from "react";
import Footer from "./components/Footer";
import { IoMdCopy } from "react-icons/io";
import { MdCheckCircle, MdOutlineArrowForwardIos } from "react-icons/md";
import axios from "axios";

interface IGeneratedVars {
  name: string;
  reason: string;
}

interface IChatGPTResponse {
  state: boolean;
  message: string;
  data: IGeneratedVars[];
}

type status = "info" | "warning" | "success" | "error" | "loading" | undefined;

function App() {
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [generatedVars, setGeneratedVars] = useState<IGeneratedVars[]>([]);
  const toast = useToast();
  const toastIdRef = useRef<ToastId>();
  const outputRef = useRef<any>();

  const SERVER_URL = process.env.REACT_APP_SERVER_URL as string;

  function makeToast(status: status, position: ToastPosition, title: string) {
    toastIdRef.current = toast({
      title,
      status,
      isClosable: true,
      variant: "left-accent",
      duration: 3000,
      position,
    });
  }

  function copyTextToClipboard(text: string) {
    if (navigator.clipboard) {
      // (IE는 사용 못하고, 크롬은 66버전 이상일때 사용 가능합니다.)
      navigator.clipboard
        .writeText(text)
        .then(() => {
          makeToast("success", "bottom", "클립보드에 복사되었습니다.");
        })
        .catch(() => {
          makeToast("error", "bottom", "복사를 다시 시도해주세요.");
        });
    } else {
      if (!document.queryCommandSupported("copy")) {
        return makeToast("error", "bottom", "복사하기가 지원되지 않는 브라우저입니다.");
      }

      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.top = "0";
      textarea.style.left = "0";
      textarea.style.position = "fixed";

      document.body.appendChild(textarea);
      // focus() -> 사파리 브라우저 서포팅
      textarea.focus();
      // select() -> 사용자가 입력한 내용을 영역을 설정할 때 필요
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      makeToast("success", "bottom", "클립보드에 복사되었습니다.");
    }
  }

  async function genVariable() {
    try {
      if (!isLoading) {
        setIsLoading(true);
        outputRef.current.scrollIntoView({
          behavior: "smooth",
        });
        const { data }: { data: IChatGPTResponse } = await axios.post(`${SERVER_URL}/ask`, {
          prompt,
        });
        if (data?.state === true) {
          setGeneratedVars(data.data);
        } else {
          makeToast("error", "bottom-left", data.message);
        }
        setIsLoading(false);
      }
    } catch {
      setIsLoading(false);
      makeToast("error", "bottom-left", "서버 오류가 발생했습니다.");
    }
  }

  return (
    <>
      <Header />
      <Box as="main" mt={5}>
        <form>
          <Flex
            h={{ base: "auto", lg: "60vh" }}
            paddingLeft={10}
            paddingRight={10}
            flexDirection={{ base: "column", lg: "row" }}
          >
            <Flex as="section" w="full" flexDirection="column">
              <Heading w="full" fontSize="xl" mb={5}>
                Input
              </Heading>
              <Box border={1} h="55vh">
                <Textarea
                  h="full"
                  value={prompt}
                  placeholder="Copy and Paste Your Function"
                  resize="none"
                  className="scrollBarHidden"
                  onChange={(e) => setPrompt(e.target.value)}
                ></Textarea>
              </Box>
            </Flex>

            <Center mt={16} mb={5} ml={{ base: "0", lg: "5" }} mr={{ base: "0", lg: "5" }}>
              <Button
                w={{ base: "full" }}
                onClick={genVariable}
                borderRadius="full"
                colorScheme="linkedin"
                size="md"
              >
                <Text mr="2">생성</Text>
                <Icon as={MdOutlineArrowForwardIos} boxSize={5} />
              </Button>
            </Center>

            <Center>
              <Divider mt={5} mb={10} orientation="horizontal" />
            </Center>

            <Flex
              ref={outputRef}
              as="section"
              w="full"
              flexDirection="column"
              mb={{ base: "10", lg: "0" }}
            >
              <Heading w="full" fontSize="xl" mb={5}>
                Output
              </Heading>
              <Box h="55vh">
                <Card
                  h="full"
                  border="1px"
                  borderColor="gray.200"
                  borderRadius="md"
                  overflowY="scroll"
                  className="scrollBarHidden"
                >
                  {isLoading && (
                    <Center h="full">
                      <Spinner
                        thickness="3px"
                        speed="0.5s"
                        emptyColor="gray.200"
                        color="blue.500"
                        size="xl"
                      />
                    </Center>
                  )}
                  {generatedVars.length > 0 && !isLoading && (
                    <CardBody>
                      <Stack divider={<StackDivider />} spacing="4">
                        {generatedVars?.map((variable, idx) => (
                          <Box key={idx}>
                            <Flex h="2rem" align="center">
                              <Heading size="md">{variable.name}</Heading>
                              <Button
                                w="5rem"
                                h="2rem"
                                ml={3}
                                size="xs"
                                paddingLeft={3}
                                paddingRight={3}
                                borderRadius="full"
                                colorScheme="twitter"
                                variant="outline"
                                gap={1}
                                onClick={() => copyTextToClipboard(variable.name)}
                              >
                                <Icon as={IoMdCopy} boxSize={5} />
                                <Text fontSize="sm">Copy</Text>
                              </Button>
                            </Flex>
                            <Flex pt="3" fontSize="sm" align="flex-start">
                              <Flex
                                h="2rem"
                                paddingLeft={3}
                                paddingRight={3}
                                borderRadius="full"
                                color="green.500"
                              >
                                <Icon as={MdCheckCircle} boxSize={4} />
                                <Text ml={1} fontSize="sm" w="3.5rem">
                                  추천 이유
                                </Text>
                              </Flex>
                              <Text w="auto">{variable.reason}</Text>
                            </Flex>
                          </Box>
                        ))}
                      </Stack>
                    </CardBody>
                  )}
                </Card>
              </Box>
            </Flex>
          </Flex>
        </form>
      </Box>
      <Footer />
    </>
  );
}

export default App;
