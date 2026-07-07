import { For } from 'solid-js';
import type { Component } from 'solid-js';
import type { QueryResponse } from '../../api/queryApi';

export const ResultTable: Component<{ result: QueryResponse }> = (props) => (
  <table class="dm-table">
    <thead>
      <tr>
        <For each={props.result.columns}>{(col) => <th>{col}</th>}</For>
      </tr>
    </thead>
    <tbody>
      <For each={props.result.rows}>
        {(row) => (
          <tr>
            <For each={row}>{(cell) => <td>{cell}</td>}</For>
          </tr>
        )}
      </For>
    </tbody>
  </table>
);
