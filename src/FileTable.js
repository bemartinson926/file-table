import React, { Component } from 'react';
import SelectAllCheckbox from './SelectAllCheckbox';
import { titleCase } from './Helpers';
import './FileTable.css';

class FileTable extends Component {
  state = {
    files: this.props.fileData.map(file => {
      file.selected = false;
      file.status = titleCase(file.status);
      return file;
    }),
    selectedCount: 0,
    selectAllIndeterminate: false,
    selectAllChecked: false
  }

  handleSelectAll = (e) => {
    const isChecked = e.target.checked;
    const previousSelectedCount = this.state.files.filter(file => file.selected).length;
    const setAllToSelected = previousSelectedCount && (previousSelectedCount !== this.state.files.length);
    let newFiles;

    if (isChecked || setAllToSelected) {
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
      selectAllIndeterminate: newSelectedCount > 0 && newSelectedCount < newFiles.length,
      selectAllChecked: isChecked || setAllToSelected
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
        selectAllIndeterminate: newSelectedCount > 0 && newSelectedCount < newFiles.length,
        selectAllChecked: newSelectedCount === newFiles.length
      }
    })
  }

  handleDownloadSelected = () => {
    const selectedFiles = this.state.files.filter(file => file.selected);
    const formattedselectedFiles = selectedFiles.map(file => {
      return `${file.path} | ${file.device}`;
    });
    const formattedAlert = [
      'You selected the following files for download:',
      ...formattedselectedFiles
    ].join('\n');

    alert(formattedAlert);
  }

  render() {
    const { files:fileData, selectedCount, selectAllIndeterminate, selectAllChecked } = this.state;

    return (
      <div className="table-container">
        <table>
          <thead>
            <tr className="action-row">
              <th>
                <SelectAllCheckbox
                  selectAllHandler={this.handleSelectAll}
                  indeterminate={selectAllIndeterminate}
                  selectAllChecked={selectAllChecked}
                />
              </th>
              <th>
                {
                  selectedCount ?
                  `Selected ${selectedCount}` :
                  'None Selected'
                }
              </th>
              <th>
                {
                  selectedCount ?
                  <a className="download-link" onClick={this.handleDownloadSelected}>Download Selected</a> :
                  <a className="disabled">Download Selected</a>
                }
              </th>
            </tr>
            <tr>
              <th>Select</th>
              <th>Name</th>
              <th>Device</th>
              <th>Path</th>
              <th className="status-badge"></th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {
              fileData.map(file => {
                const selectedClass = file.selected ? 'selected' : null;
                console.log(file.status)
                const fileStatusClass = file.status === 'Available' ? 'status-badge dot-available' : 'status-badge';

                return (
                  <tr
                    key={file.name}
                    className={selectedClass}>
                    <td>
                      <input
                        onChange={(e) => this.handleFileSelection(file.name, e)}
                        checked={file.selected}
                        type="checkbox" />
                    </td>
                    <td>{file.name}</td>
                    <td>{file.device}</td>
                    <td>{file.path}</td>
                    <td><div className={fileStatusClass}></div></td>
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
