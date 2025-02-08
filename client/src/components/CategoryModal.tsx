import { FC } from 'react'
import { Form } from 'react-router'

interface Props {
    type: 'post' | 'patch'
    id?: number
    setVisibleModal: (visible: boolean) => void
}

export const CategoryModal: FC<Props> = ({ type, id, setVisibleModal }) => {
    return (
        <div className="fixed top-0 bottom-0 left-0 flex w-full items-center justify-center bg-black/50">
            <Form
                className="grid w-[300px] gap-2 rounded-md bg-slate-900 p-5"
                action="/categories"
                method={type}
                onSubmit={() => setVisibleModal(false)}
            >
                <label htmlFor="title"></label>
                <small className="mb-2">Category Title</small>
                <input
                    className="input w-full"
                    type="text"
                    name="title"
                    placeholder="Title..."
                />
                <input type="hidden" value={id} name="id" />

                <div className="flex items-center gap-2">
                    <button
                        className="btn btn-green cursor-pointer"
                        type="submit"
                    >
                        {type === 'patch' ? 'Save' : 'Create'}
                    </button>
                    <button
                        className="btn btn-red cursor-pointer"
                        onClick={() => setVisibleModal(false)}
                    >
                        Close
                    </button>
                </div>
            </Form>
        </div>
    )
}
