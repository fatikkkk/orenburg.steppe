import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GrantItem } from '../components/GrantItem'
import { getAllGrants } from '../redux/features/grant/grantSlice.js'

export const GrantsPage = () => {
    const dispatch = useDispatch()
    const { grants } = useSelector((state) => state.grant)


    useEffect(() => {
        dispatch(getAllGrants())
    }, [dispatch])

    if (!grants.length) {
        return (
            <div className='text-xl text-center text-black py-10'>
                Постов не существует.
            </div>
        )
    }

    return (
        <div className='mx-auto py-10'>
            <p className='text-[#009900] text-3xl font-bold pb-4'>Actual Grants</p>
            <div className='gap-8'>
                <div className='gap-10 flex flex-wrap justify-between'>
                    {grants?.map((grant, idx) => (
                        <GrantItem key={idx} grant={grant} />
                    ))}
                </div>
            </div>
        </div>
    )
}
