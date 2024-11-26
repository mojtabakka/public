
import React from 'react'
import Modal from '../modal';
import { isFunction } from 'lodash';
import ModalForm from './modalForm';
import { Address } from '@/types/address.type';
interface PropsType {
    show: boolean
    onClose?: () => void,
    onResult: (item: Address) => void
}
export default function ModalAddAddress(props: PropsType) {
    const {
        onResult,
        show,
        onClose
    } = props
    return (
        <Modal
            show={show}
            title="افزودن آدرس"
            className="overflow-x-hidden"
            onClose={() => { if (isFunction(onClose)) onClose() }}
            modalContent={<ModalForm onResult={(item) => onResult(item)} />}
            sheetContent={<ModalForm onResult={(item) => onResult(item)} />}
        />

    );
}
