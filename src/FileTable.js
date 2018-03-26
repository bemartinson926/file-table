import React, { Component } from 'react';
import SelectAllCheckbox from './SelectAllCheckbox';

class FileTable extends Component {
  state = {
    files: this.props.fileData.map(file => {
      file.selected = false;
      return file;
    }),
    selectedCount: 0,
    selectAllIndeterminate: false
  }

  handleSelectAll = (e) => {
    const isChecked = e.target.checked;
    let newFiles;

    if (isChecked) {
      newFiles = this.state.files.map(file => {
        file.selected = true;
        return file;
      });
    } else {
      newFiles = this.state.files.map(file => {
        file.selected = false;
        return file;
      });
    }

    const newSelectedCount = newFiles.filter(file => file.selected).length;

    this.setState({
      files: newFiles,
      selectedCount: newSelectedCount,
      selectAllIndeterminate: newSelectedCount > 0 && newSelectedCount < newFiles.length
    })
  }

  handleFileSelection = (fileName, e) => {
    const target = e.target;
    const value = target.checked;

    this.setState((prevState, props) => {
      const newFiles = prevState.files.map(file => {
        if (file.name === fileName) {
          file.selected = value;
        }
        return file;
      });

      const newSelectedCount = newFiles.filter(file => file.selected).length;

      return {
        files: newFiles,
        selectedCount: newSelectedCount,
        selectAllIndeterminate: newSelectedCount > 0 && newSelectedCount < newFiles.length
      }
    })
  }

  render() {
    const { files:fileData, selectedCount, selectAllIndeterminate } = this.state;

    return (
      <div>
        <SelectAllCheckbox
          selectAllHandler={this.handleSelectAll}
          indeterminate={selectAllIndeterminate}
        />
        <p>
          {
            selectedCount ?
            `Selected ${selectedCount}` :
            'None Selected'
          }
        </p>
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
                      <input
                        onChange={(e) => this.handleFileSelection(file.name, e)}
                        checked={file.selected}
                        type="checkbox" />
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
      </div>
    );
  }
}

export default FileTable;
