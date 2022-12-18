import Dropzone from 'react-dropzone';
import { Controller } from 'react-hook-form';
import styled from 'styled-components';
import useAuth from '../hooks/useAuth';
import ShowImage from './ShowImage';
import { useCallback, useState } from 'react';

const getColor = (props) => {
  if (props.isDragAccept) {
    return '#00e676';
  }
  if (props.isDragReject) {
    return '#ff1744';
  }
  if (props.isFocused) {
    return '#2196f3';
  }
  return '#eeeeee';
};
const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  border-width: 2px;
  border-radius: 10px;
  border-color: ${(props) => getColor(props)};
  border-style: dashed;
  background-color: #fafafa;
  color: black;
  font-weight: bold;
  font-size: 1.4rem;
  outline: none;
  transition: border 0.24s ease-in-out;
`;
const FileInput = ({ control, name, inputFile, setInputFile }) => {
  const { currentColor } = useAuth();

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.map((file, index) => {
      const reader = new FileReader();

      reader.onload = function (e) {
        setInputFile((prevState) => [
          ...prevState,
          { id: index, src: e.target.result, fileInput: file }
        ]);
      };
      reader.readAsDataURL(file);

      return file;
    });
  }, []);
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={[]}
      render={({ field: { onBlur } }) => (
        <>
          <Dropzone onDrop={onDrop}>
            {({ getRootProps, getInputProps }) => (
              <Container {...getRootProps()}>
                <input {...getInputProps()} name={name} onBlur={onBlur} />
                <p style={{ color: currentColor, cursor: 'pointer' }}>
                  Drag 'n' drop files here, or click to select files
                </p>
              </Container>
            )}
          </Dropzone>
          {/* <ul className="flex justify-center">
            {value.map((f, index) => (
              <li key={index}>
                {f.name} {f.size}
              </li>
            ))}
          </ul> */}
          <ShowImage images={inputFile} setParentState={setInputFile} />
        </>
      )}
    />
  );
};

export default FileInput;
