import React from 'react'
import {AiOutlineSearch} from 'react-icons/ai'
import Moment from 'react-moment'

export const GrantItem = ({grant}) => {

  if(!grant){
    return <div className='text-lx text-center text-black py-10'>
      No current grants available at the moment
    </div>
  }

  return (

    <div className='flex flex-col basis-1/4 flex-grow border-2 border-gray-500 rounded-3xl p-5 '>
        <div className={grant.imgUrl ? 'flex rouded-sm h-80' : 'flex rounded-sm'}>
          {grant.imgUrl && (
          <img src={`http://localhost:3001/${grant.imgUrl}`} alt='grantlogo' className='object-cover w-full'/>
          )}
          </div>
        <div className="flex justify-between items-center pt-2">
            <div className="text-sx text-black opacity-50">{grant.nameSite}</div>
            <div className="text-sx text-black opacity-50">
              Обновлен: <Moment date={grant.createdAt} format='D MMM YYYY'/>
            </div>
        </div>
        <div className="text-black text-xl text-justify pt-4 leading-5">Наименование: {grant.name}</div>
        <p className='text-black opacity-60 text-sx text-justify pt-2 leading-5'>Описание: {grant.desc}</p>
        <div className="text-black text-sx pt-4">Финансирование: {grant.financy}</div>
        <div className="text-black text-sx">Сроки сдачи: {grant.deadline}</div>

        <div className="flex gap-3 items-center mt-2">
          <a href={grant.url} target="_blank" rel="noopener noreferrer" className='flex items-center justify-center gap-2 text-sx text-black opacity-50'>
            Подробнее
            <AiOutlineSearch />
          </a>
        </div>
    </div>
  )
}
