import {
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  Link,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { IoLogoGithub, IoMdMoon, IoMdSunny } from "react-icons/io";

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box
      as="header"
      position="sticky"
      top="0"
      boxShadow="sm"
      bgColor={colorMode === "light" ? "white" : "gray.700"}
      zIndex={999}
    >
      <Box h="4.5rem">
        <Flex
          h="4.5rem"
          justify="space-between"
          align="center"
          paddingLeft={10}
          paddingRight={10}
        >
          <Link
            href="/"
            _hover={{ textDecoration: "none" }}
            fontWeight="bold"
            fontSize="1.5rem"
          >
            <Text>변수명 생성기</Text>
          </Link>

          <HStack spacing="1rem">
            <Flex w="2.5rem" h="2.5rem">
              <Button
                as="a"
                target="_blank"
                href="https://github.com/YongJaeHyun/auto_variable_generator"
                aria-label="프로젝트 깃허브 주소"
                w="2.5rem"
                h="2.5rem"
              >
                <Icon as={IoLogoGithub} boxSize={6} />
              </Button>
            </Flex>
            <Flex justify="center" alignItems="center">
              <Button w="2.5rem" h="2.5rem" onClick={toggleColorMode} aria-label="테마 변경 버튼">
                <Icon as={colorMode === "light" ? IoMdMoon : IoMdSunny} boxSize={6} />
              </Button>
            </Flex>
          </HStack>
        </Flex>
      </Box>
    </Box>
  );
};

export default Header;
