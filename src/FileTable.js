import React, { Component } from 'react';
import SelectAllCheckbox from './SelectAllCheckbox';
import { titleCase } from './Helpers';
import './FileTable.css';
import { FaArrowDown } from 'react-icons/lib/fa';

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

    let formattedAlert;
    if (formattedselectedFiles.length) {
      formattedAlert = [
        'You selected the following files for download:',
        ...formattedselectedFiles
      ].join('\n');
    } else {
      formattedAlert = "You must select at least 1 file to be downloaded.";
    }

    alert(formattedAlert);
  }

  render() {
    const { files:fileData, selectedCount, selectAllIndeterminate, selectAllChecked } = this.state;
    const downloadClassNames = selectedCount ? 'download-link' : 'download-link disabled';

    return (
      <div className="table-container">
        <table>
          <thead>
            <tr className="action-row">
              <th colSpan="4">
                <SelectAllCheckbox
                  selectAllHandler={this.handleSelectAll}
                  indeterminate={selectAllIndeterminate}
                  selectAllChecked={selectAllChecked}
                />
                {
                  selectedCount ?
                  `Selected ${selectedCount}` :
                  'None Selected'
                }
                {
                  <a
                    className={downloadClassNames}
                    onClick={this.handleDownloadSelected}>
                      <FaArrowDown className={downloadClassNames} /> Download Selected
                  </a>
                }
              </th>
            </tr>
            <tr>
              <th></th>
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
