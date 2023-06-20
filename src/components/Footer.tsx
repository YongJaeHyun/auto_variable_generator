import { Center, Circle, HStack, Icon, Link, Text, VStack } from "@chakra-ui/react";
import { IoLogoGithub } from "react-icons/io";
import { MdEmail } from "react-icons/md";

const Footer = () => {
  return (
    <Center
      as="footer"
      w="full"
      h="8rem"
      bgColor="blackAlpha.700"
      color="whiteAlpha.900"
      position={{ sm: "static", lg: "fixed" }}
      bottom="0"
    >
      <VStack>
        <Text fontSize="sm" colorScheme="whiteAlpha">
          CodeNamer made by YongjaeHyun
        </Text>
        <HStack spacing="1rem">
          <Link target="_blank" href="https://github.com/YongJaeHyun">
            <Circle>
              <Icon as={IoLogoGithub} boxSize={6} />
            </Circle>
          </Link>
          <Link href="mailto:dltjrrbs2020@gmail.com">
            <Circle>
              <Icon as={MdEmail} boxSize={6} />
            </Circle>
          </Link>
        </HStack>
        <Text fontSize="sm" colorScheme="whiteAlpha">
          Copyright &copy; 2023 CodeNamer. All rights reserved.
        </Text>
      </VStack>
    </Center>
  );
};

export default Footer;
