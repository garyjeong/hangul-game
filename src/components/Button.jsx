export function Button({ children, onClick, variant = 'primary', size = 'md', className = '', disabled = false }) {
  const baseStyles = 'font-bold rounded-2xl transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed'

  const variants = {
    primary: 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg hover:shadow-xl hover:scale-105',
    secondary: 'bg-gradient-to-r from-gray-200 to-gray-300 text-gray-700 shadow hover:shadow-md hover:scale-105',
    success: 'bg-gradient-to-r from-green-400 to-emerald-500 text-white shadow-lg hover:shadow-xl hover:scale-105',
    danger: 'bg-gradient-to-r from-red-400 to-rose-500 text-white shadow-lg hover:shadow-xl hover:scale-105',
  }

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-lg',
    lg: 'px-8 py-4 text-xl',
    xl: 'px-10 py-5 text-2xl',
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </button>
  )
}
