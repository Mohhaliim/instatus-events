import { Parser } from 'json2csv';

function jsonToCSV(jsonData: object[]): string {
  const fields = [
    'id',
    'object',
    'actor_id',
    'actor_name',
    'group',
    'action.id',
    'action.object',
    'action.name',
    'target_id',
    'target_name',
    'location',
    'occurred_at',
    'metadata.redirect',
    'metadata.description',
    'metadata.x_request_id',
  ];

  const parser = new Parser({ fields });

  return parser.parse(jsonData);
}

export function downloadCSV(jsonData: object[]): void {
    const filename = 'events';
    const csvData = jsonToCSV(jsonData);
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
  }