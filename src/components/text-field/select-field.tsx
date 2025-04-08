import React from 'react'

interface SelectFieldProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  id?: string
  options?: Array<{ value: string; label: string }>
  placeholder?: string
}

function SelectField({ id, options, placeholder = "Choose a item", ...restProps}: SelectFieldProps) {
  return (
    <select 
      id={id}
      className="h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 pr-11 text-sm shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 text-gray-400 dark:text-gray-400 dark:bg-dark-900"
      {...restProps}
    >
      <option selected>{placeholder}</option>
      {options?.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  )
}

export default SelectField