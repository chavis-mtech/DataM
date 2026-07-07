import type { Component } from 'solid-js';
import { Button } from '../common/Button';
import { Select } from '../common/Select';
import type { Engine } from '../../api/queryApi';

const ENGINES = [
  { value: 'sqlite', label: 'SQLite' },
  { value: 'mariadb', label: 'MariaDB' },
];

type Props = {
  engine: Engine;
  onEngineChange: (engine: Engine) => void;
  onRun: () => void;
  running: boolean;
  statusText?: string;
};

export const QueryToolbar: Component<Props> = (props) => (
  <div class="dm-toolbar">
    <Select
      options={ENGINES}
      value={props.engine}
      onChange={(e) => props.onEngineChange(e.currentTarget.value as Engine)}
    />
    <Button onClick={props.onRun} disabled={props.running}>
      {props.running ? 'Running…' : 'Run (⌘⏎)'}
    </Button>
    {props.statusText && <span class="dm-status">{props.statusText}</span>}
  </div>
);
