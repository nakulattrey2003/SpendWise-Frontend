import React from 'react'

const TransactionInfoCard = ({icon, title, date, amount, type, hideDeleteButton, onDelete}) => {
    const getAmountStyles = () => type === 'income' ? 'text-green-500' : 'text-red-500'
  return (
    <div>TransactionInfoCard</div>
  )
}

export default TransactionInfoCard