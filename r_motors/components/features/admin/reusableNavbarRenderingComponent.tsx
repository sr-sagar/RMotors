import ToastComponent from '@/components/(common)/toastComponent'
import React from 'react'

type Column<T,> = {
    header: string,
    key: keyof T | string,
    render?: (row: T) => React.ReactNode,
}

type ReusableNavbarComponentProps<T,> = {
    data: T[],
    column: Column<T>[],
    success: boolean,
    message: string
}
const ReusableNavbarRenderingComponent = <T,>({data,column,success,message}: ReusableNavbarComponentProps<T>) => {
  return (
    <section className='w-full h-max  shadow-md rounded-md p-4 flexClass flex-col gap-y-4 overflow-x-auto px-2' style={{scrollbarWidth: 'none'}}>
        <ToastComponent success={success} message={message}/>
        <div className='w-full h-max flex justify-between items-center gap-x-2 '>
            {column.map((item) => (
                <p key={item.header}>{item.header}</p>
            ))

            }
        </div>

        {data&& data.length > 0 ? (
            data.map((row,idx) => (
                <div key={idx} className='w-full h-max flex justify-between items-center gap-x-2 '>
                    {column.map((item) => (
                        <p key={item.header} className='text-sm md:text-md '>{item.render? item.render(row) : (row as any)[item.key]}</p>


                    ))}
                </div>

            ))
        )
        :
        (
            <p>No Data Available</p>
        )
        }

    </section>
  )
}

export default ReusableNavbarRenderingComponent