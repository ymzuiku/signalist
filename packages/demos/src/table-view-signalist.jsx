import { Table, TableContainer, Tbody, Th, Thead, Tr } from "@chakra-ui/react";
import { For, computed, signalJSX } from "signalist";

function Row({ product, count, random }) {
  return signalJSX(
    <tr>
      <td>
        <code>{random}</code>
      </td>
      <td>
        <code>{count}</code>
      </td>
      <td>
        <code>{product}</code>
      </td>
      <td>
        <code>
          {random} * {count} = {product}
        </code>
      </td>
      <div>
        {Array(100)
          .fill(0)
          .map((v, i) => (
            <div key={i}>
              <div>
                <div></div>
              </div>
            </div>
          ))}
      </div>
    </tr>,
  );
}

function TableViewSignalist({ array, count }) {
  return signalJSX(
    <TableContainer>
      <Table size="md">
        <Thead>
          <Tr>
            <Th>Random</Th>
            <Th>Count {count}</Th>
            <Th>Product</Th>
            <Th>Equation</Th>
          </Tr>
        </Thead>
        <Tbody>
          <For each={array}>
            {(random, index) => {
              return <Row key={index} product={computed(() => count() * random)} random={random} count={count} />;
            }}
          </For>
        </Tbody>
      </Table>
    </TableContainer>,
  );
}

export default TableViewSignalist;
