import { FC, useState } from 'react'
import { AiFillCloseCircle, AiFillEdit } from 'react-icons/ai'
import { FaPlus } from 'react-icons/fa'
import { Form, useLoaderData } from 'react-router'
import { CategoryModal } from '../components/CategoryModal'
import { instanceAxios } from '../api/axios.api'
import { ICategory } from '../types/types'
import { toast } from 'react-toastify'

export const categoriesAction = async ({ request }: any) => {
    try {
        switch (request.method) {
            case 'POST': {
                const formData = await request.formData()
                const title = {
                    title: formData.get('title'),
                }
                await instanceAxios.post('/categories', title)
                return null
            }
            case 'PATCH': {
                const formData = await request.formData()
                const category = {
                    id: formData.get('id'),
                    title: formData.get('title'),
                }

                await instanceAxios.patch(
                    `/categories/category/${category.id}`,
                    category
                )
                return null
            }
            case 'DELETE': {
                const formData = await request.formData()

                const categoryId = formData.get('id')

                await instanceAxios.delete(`/categories/category/${categoryId}`)

                return null
            }
        }
    } catch (err: any) {
        const error = err.response?.data.message
        toast.error(error.toString())
    }
}

export const categoryLoader = async () => {
    try {
        const { data } = await instanceAxios.get<ICategory[]>('/categories')

        return data
    } catch (err: any) {
        const error = err.response?.data.message
        toast.error(error.toString())
    }
}

export const Categories: FC = () => {
    const categories = useLoaderData() as ICategory[]
    const [visibleModal, setVisibleModal] = useState(false)
    const [categoryId, setCategoryId] = useState<number>(0)
    const [isEdit, setIsEdit] = useState<boolean>(false)

    return (
        <>
            <div className="mt-10 rounded-md bg-slate-800 p-4">
                <h1>Your category list: </h1>
                {/* Category List */}
                <div className="mt-2 flex flex-wrap items-center gap-2">
                    {categories && categories.map((category) => (
                        <div
                            key={category.id}
                            className="group relative flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2"
                        >
                            {category.title}
                            <div className="absolute top-0 right-0 bottom-0 left-0 hidden items-center justify-between rounded-lg bg-black/90 px-3 group-hover:flex">
                                <button>
                                    <AiFillEdit
                                        className="cursor-pointer"
                                        onClick={() => {
                                            setVisibleModal(true)
                                            setCategoryId(category.id)
                                            setIsEdit(true)
                                        }}
                                    />
                                </button>
                                <Form
                                    className="flex"
                                    method="delete"
                                    action="/categories"
                                >
                                    <input
                                        type="hidden"
                                        value={category.id}
                                        name="id"
                                    />
                                    <button
                                        type="submit"
                                        className="cursor-pointer"
                                    >
                                        <AiFillCloseCircle />
                                    </button>
                                </Form>
                            </div>
                        </div>
                    ))}
                </div>

                <button
                    className="mt-5 flex max-w-fit cursor-pointer items-center gap-2 text-white/50 hover:text-white"
                    onClick={() => setVisibleModal(true)}
                >
                    <FaPlus />
                    <span>Create new Category</span>
                </button>
            </div>
            {/* Add category modal */}

            {visibleModal && (
                <CategoryModal type="post" setVisibleModal={setVisibleModal} />
            )}

            {/* Edit category modal */}
            {visibleModal && isEdit && (
                <CategoryModal
                    type="patch"
                    id={categoryId}
                    setVisibleModal={setVisibleModal}
                />
            )}
        </>
    )
}
