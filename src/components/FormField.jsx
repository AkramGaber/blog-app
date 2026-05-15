import React from 'react'

export default function FormField({
    label,
    name,
    type='text',
    register,
    error,
    ...props
}) {
  return (
    <div className='form-control w-full'>
        <label className='label'>
            <span className='label-text font-medium'>{label}</span>
        </label>
        <input type={type} className={`input input-bordered w-full ${error ? 'input-error' : ''}`} {...register(name)} {...props} />

        {error && (
            <label className='label'>
                <span className='label-text-alt text-error'>
                    {error.message}
                </span>
            </label>
        )}
    </div>
  )
}
