"use client"
import Button from '@/components/(common)/button'
import React, { useCallback } from 'react'
import { DropzoneOptions, FileWithPath, useDropzone } from 'react-dropzone'

const DragAndDropComponent = () => {
    const onDrop: DropzoneOptions["onDrop"] = useCallback((acceptedFiles : readonly FileWithPath[]) => {
        console.log(acceptedFiles)
    },[])

    const {getRootProps,getInputProps,isDragActive, acceptedFiles, fileRejections} = useDropzone({
        onDrop,
        accept: {"image/*": []},
        multiple: true,
        maxSize: 1024 * 1024 * 2,

    })
  return (
    <div className='w-full  h-max md:min-h-[100px] flexClass flex-col gap-y-2'>
        <p className='w-full text-start'>Car Photos</p>
        <div {...getRootProps({className: 'w-full h-max md:h-[200px] border-4 border-gray-400 border-dotted rounded-md flexClass flex-col gap-y-2 p-2'})}>
            <input {...getInputProps({className:"w-full h-max rounded-md"})} />
            <p className='text-md md:text-2xl text-center'>Upload Photos</p>
            <p className='text-sm md:text-md text-center'>Drag and drop here, or click to select</p>
            <div className='w-max h-[50px] flexClass'>
                <Button btnText='Choose file' btnWidth={100}/>
            </div>
        </div>
            </div>
  )
}

export default DragAndDropComponent