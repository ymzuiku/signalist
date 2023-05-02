import { Button, Flex, SkeletonCircle, SkeletonText, Stack, Text } from "@chakra-ui/react";
import { Suspense, lazy } from "react";
import { computed, signalJSX, useSignal } from "signalist";
const LagRadar = lazy(() => import("react-lag-radar"));
const TableViewSignalist = lazy(() => import("./table-view-signalist"));

const TimesTable = ({ nodes }) => {
  const count = useSignal(0);

  const array = computed(() => {
    count();
    const array = Array(nodes());
    for (let i = 0; i < nodes(); i++) {
      array[i] = Math.floor(Math.random() * 100);
    }
    return array;
  });

  return signalJSX(
    <Stack direction="column" spacing={5}>
      <Flex justifyContent="center" alignItems="center" flexDirection="column">
        <Suspense fallback={<SkeletonCircle size="200" />}>
          <LagRadar size={200} />
        </Suspense>
        <Text fontSize="xs" mb={3}>
          Low blocking time, and low delay in updating UI
        </Text>
      </Flex>

      <Button
        colorScheme="purple"
        variant="outline"
        onClick={() => {
          count.value += 1;
        }}
      >
        <div fontSize="md">Signalist Increment ({count})</div>
      </Button>

      <Suspense fallback={<SkeletonText noOfLines={9} spacing="3" skeletonHeight="2" />}>
        <TableViewSignalist array={array} count={count} />
      </Suspense>
    </Stack>,
  );
};

export default TimesTable;
