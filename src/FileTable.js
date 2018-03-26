import React, { Component } from 'react';

class FileTable extends Component {
  render() {
    return (
      <table>
        <thead>
          <tr>
            <th>Select</th>
            <th>Name</th>
            <th>Device</th>
            <th>Path</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <input type="checkbox" />
            </td>
            <td>File name</td>
            <td>Device name</td>
            <td>File path</td>
            <td>File status</td>
          </tr>
        </tbody>
      </table>
    );
  }
}

export default FileTable;
