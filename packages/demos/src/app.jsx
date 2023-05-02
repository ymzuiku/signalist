import { ExternalLinkIcon } from "@chakra-ui/icons";
import {
  Code,
  Container,
  Heading,
  Link,
  ListItem,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import { startTransition, useState } from "react";
import GithubCorner from "react-github-corner";
import { If, computed, useSignal } from "signalist";
import TimesTable from "./times-table";
import TimesTableSignalist from "./times-table-signalist";

function App() {
  const [nodes, setNodes] = useState(1000);
  const nodesSignal = useSignal(1000);
  const tab = useSignal(0);
  const handleChange = (nodes) => {
    startTransition(() => {
      setNodes(nodes || 1);
    });
    nodesSignal.value = nodes || 1;
  };
  return (
    <>
      <Container p={6}>
        <Stack direction="column" spacing={3}>
          <Heading>Signalist vs. React Demo</Heading>
          <Text>
            The following is a random times table generator benchmark (
            <Link href="https://github.com/ymzuiku/signalist" isExternal color="purple">
              source <ExternalLinkIcon mx="2px" />
            </Link>
            ). It follows a comparison between React and Signalist, along with its fiber equivalents.
          </Text>
          <Heading as="h4" size="md">
            Instructions
          </Heading>
          <Text>
            In order to invoke a re-render, click the "Increment "button below. The "Lag" radar indicates blocking time,
            but does not account for the time it takes to update the UI. Notice the time it takes to update the UI after
            you click to get an idea for update time.
          </Text>
          <Heading as="h4" size="md">
            Notes
          </Heading>
          <Text>
            <UnorderedList>
              <ListItem>
                Every row contains 100 empty <Code>{"<div />"}</Code> nodes to stimulate diffing in order to measure
                performance.
              </ListItem>
              <ListItem>
                Should not be used as a benchmark for real-world applications (this is a very intensive case that isn't
                necessarily representative)
              </ListItem>
            </UnorderedList>
          </Text>
          <Text>
            You can adjust the number of rows by using the the number input. Make sure to adjust if you can't see any
            performance difference or your screen freezes.
          </Text>
        </Stack>

        <NumberInput mt={3} maxW={1000} min={0} mr="2rem" value={nodes} onChange={handleChange}>
          <NumberInputField placeholder="Enter number of rows" />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <Tabs
          isLazy={true}
          variant="soft-rounded"
          colorScheme="purple"
          mt={3}
          onChange={(v) => {
            tab.value = v;
          }}
        >
          <TabList>
            <Tab>React</Tab>
            <Tab>React Fiber</Tab>
            <Tab>⚡ Signalist</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <TimesTable nodes={nodes} mode="react" />
            </TabPanel>
            <TabPanel>
              <TimesTable nodes={nodes} mode="react-fiber" />
            </TabPanel>
            <TabPanel></TabPanel>
          </TabPanels>
        </Tabs>
        <If value={computed(() => tab() === 2)}>
          <TimesTableSignalist nodes={nodesSignal} />
        </If>
      </Container>
      <GithubCorner direction="left" href="https://github.com/ymzuiku/signalist" />
    </>
  );
}

export default App;
