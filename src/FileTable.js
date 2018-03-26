import React, { Component } from 'react';

class FileTable extends Component {
  state = {
    files: this.props.fileData.map(file => {
      file.selected = false;
      return file;
    })
  }

  render() {
    const { files:fileData } = this.state;

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
          {
            fileData.map(file => {
              return (
                <tr key={file.name}>
                  <td>
                    <input type="checkbox" />
                  </td>
                  <td>{file.name}</td>
                  <td>{file.device}</td>
                  <td>{file.path}</td>
                  <td>{file.status}</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    );
  }
}

export default FileTable;
