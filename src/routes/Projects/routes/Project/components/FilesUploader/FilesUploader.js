import React from 'react'
import PropTypes from 'prop-types'
import Dropzone from 'react-dropzone'
import LoadingSpinner from 'components/LoadingSpinner'
import UploadIcon from 'material-ui/svg-icons/file/cloud-upload'
import { colors } from 'styles/colors'
import classes from './FilesUploader.scss'

const acceptedImageFormats = [
  'image/png',
  'image/jpg',
  'image/jpeg',
  'image/gif',
  'image/bmp',
]

export const FilesUploader = ({
  onFilesDrop,
  isUploading,
  isCompact,
  maxSelection,
  disabled,
}) => (
  <div className={classes.container}>
    {
    !isUploading
      ?
        <Dropzone
          onDrop={onFilesDrop}
          className={`${classes.dropzone} ${isCompact && classes.dropzoneCompact}`}
          activeClassName={classes.dropzoneActive}
          disableClick={disabled}
          accept={maxSelection === 1 ? acceptedImageFormats.join(', ') : undefined}
        >
          <UploadIcon
            className={classes[`icon${isCompact ? 'Compact' : ''}`]}
            color={colors.jellyBean}
            hoverColor={colors.alto}
          />
          <div className={classes[`dropzone${isCompact ? 'Text' : 'Title'}`]}>
              Drag & Drop
          </div>
          <div className={classes.dropzoneText}>
            your files here or <span className="underline">browse</span>
          </div>
        </Dropzone>
      :
        <div className={classes.dropzone}>
          <LoadingSpinner />
        </div>
  }
  </div>
)

FilesUploader.propTypes = {
  onFilesDrop: PropTypes.func.isRequired,
  maxSelection: PropTypes.number,
  isCompact: PropTypes.bool,
  isUploading: PropTypes.bool,
  disabled: PropTypes.bool,
}

export default FilesUploader
