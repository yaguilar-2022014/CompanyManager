'use strict'

import Company from '../company/company.model.js'
import Category from './category.model.js'

export const test = (req, res) => {
    res.send({ message: 'CATEGORY | Function test' })
}

export const addCategory = async (req, res) => {
    try {
        let data = req.body
        let category = new Category(data)
        await category.save()
        return res.send({ message: 'Category added successfuly !!' })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error adding category' })
    }
}

export const defaultCategory = async()=>{
    try {
        const exists = await Category.findOne({name: 'DEFAULT'})
        if(exists){
            return console.log('Default category already exists')
        }else{
            let data = {
                name: 'DEFAULT',
                description: 'Default category'
            }
            let category = new Category(data)
            await category.save()
            return console.log('Default Category has been created')
        }
    } catch (err) {
        console.error('Error adding default category', err)
    }
}

export const deleteCategory = async (req, res)=>{
    try {
        let {id} = req.params
        //Get default category
        const defaultCategory = await Category.findOne({name: 'DEFAULT'})
        //Update Company
        await Company.updateMany({category: id}, {category: defaultCategory._id})

        let deletedCategory = await Category.deleteOne({_id: id})

        if(deletedCategory.deletedCount == 0)return res.status(404).send({message: 'Category not found, not deleted'})
        return res.send({message: 'Category deteled successfuly !!'})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'Error deleting category'})
    }
}
