"use client"
import Button from '@/components/(common)/button'
import React, { useCallback } from 'react'
import { DropzoneOptions, FileWithPath, useDropzone } from 'react-dropzone'
import {useState} from 'react';
import { devLogger } from '../../../utils/devLogger';

const DragAndDropComponent = ({files,setFiles,handleUpload}: {files: File[], setFiles: React.Dispatch<React.SetStateAction<File[]>>, handleUpload: () => void}) => {
    const [fileName,setFileName] = useState<string[]>([])
    const onDrop: DropzoneOptions["onDrop"] = useCallback((acceptedFiles : readonly FileWithPath[]) => {
        devLogger(acceptedFiles)
        acceptedFiles.forEach((item) => {
            setFileName((prev : string[]) => [...prev, item.name])
        })

        setFiles((prev) => [...prev,...acceptedFiles])
        
    },[])

    const {getRootProps,getInputProps,isDragActive, acceptedFiles, fileRejections} = useDropzone({
        onDrop,
        accept: {"image/*": []},
        multiple: true,
        maxSize: 2048 * 2048 * 2,

    })

    
  return (
    <div className='w-full  h-max md:min-h-[100px] flexClass flex-col gap-y-2'>
        <p className='w-full text-start'>Car Photos</p>
        <div {...getRootProps({className: 'w-full h-max md:h-[200px] border-4 border-gray-400 border-dotted rounded-md flexClass flex-col gap-y-2 p-2 '})}>
            <input {...getInputProps({className:"w-full h-max rounded-md"})} />
            <p className='text-md md:text-2xl text-center'>Upload Photos</p>
            <p className='text-[10px] truncate md:text-md text-center '>{fileName[fileName.length -1] ?? "Drag and drop here, or click to select"}</p>
            <div className='w-max h-[50px] flexClass'>
                <Button btnText='Choose file'  btnWidth={100}/>
            </div>
        </div>
            </div>
  )
}

export default DragAndDropComponent