'use strict'

import Company from './company.model.js'
import Category from '../category/category.model.js'
import exceljs from 'exceljs'

const workbook = new exceljs.Workbook()
const worksheet = workbook.addWorksheet('Companies')

export const test = (req, res) => {
    return res.send({ message: 'COMPANY | Function test' })
}

export const addCompany = async (req, res) => {
    try {
        let data = req.body
        console.log(data)
        let category = await Category.findOne({ _id: data.category })
        if (!category) return res.status(404).send({ message: 'Category not found' })
        let company = new Company(data)
        await company.save()
        await updateExcel()
        return res.send({ message: 'Company added successfuly !!' })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error adding category' })
    }
}

export const updateCompany = async (req, res) => {
    try {
        let { uid } = req.params
        let data = req.body
        let company = await Company.findOne({ _id: uid })
        if (!company) return res.status(404).send({ message: 'Company not found' })
        let updatedcompany = await Company.findOneAndUpdate(
            { _id: uid },
            data,
            { new: true }
        )
        await updateExcel()
        return res.send({ message: `Company updated ${updatedcompany}` })
    } catch (err) {
        console.error(err)
    }
}

export const listCompany = async (req, res) => {
    try {
        let company = await Company.find({}).populate('category', ['name'])
        return res.send({ company })
    } catch (err) {
        return console.error(err)
    }
}

export const listAsc = async (req, res) => {
    try {
        let company = await Company.find({}).populate('category', ['name']).sort({ name: 'asc' })
        return res.send({ company })
    } catch (err) {
        return console.error(err)
    }
}

export const listDesc = async (req, res) => {
    try {
        let company = await Company.find({}).populate('category', ['name']).sort({ name: 'desc' })
        return res.send({ company })
    } catch (err) {
        return console.error(err)
    }
}

export const listByTrajectory = async (req, res) => {
    try {
        let companies = await Company.find({}).populate('category', ['name']).sort({ trajectory: 'asc' })
        return res.send({ companies })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error searching by Trajectory years' })
    }
}

export const listByCategory = async (req, res) => {
    try {
        let { search } = req.body
        let companies = await Company.find({ category: search }).populate('category', ['name'])
        return res.send({ companies })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error searching by Trajectory years' })
    }
}

export const generateExcel = async (req, res) => {
    try {
        const workbook = new exceljs.Workbook()
        const worksheet = workbook.addWorksheet('Companies')
        //Headers
        worksheet.addRow(['Name', 'Impact', 'Trajectory Years', 'Category'])
        //Get Companies
        const companies = await Company.find()
        //Add companies data to Excel file
        for (const company of companies) {
            const { name, impact, trajectory, category } = company
            //Seacrh Category name
            const categorySearch = await Category.findById(category)
            const categoryName = categorySearch.name
            worksheet.addRow([name, impact, trajectory, categoryName])
        }
        //Save Excel file
        const filePath = 'CompaniesReport.xlsx'
        await workbook.xlsx.writeFile(filePath)
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error at generating excel file' })
    }
}

export const updateExcel = async (req, res) => {
    try {
        //Clear existing rows
        worksheet.spliceRows(2, worksheet.rowCount - 1)
        //Get Companies
        const companies = await Company.find({})
        //Add Companies to Excel file
        for (const company of companies) {
            const { name, impact, trajectory, category } = company
            //Seacrh Category name
            const categorySearch = await Category.findById(category)
            const categoryName = categorySearch ? categorySearch.category : ''
            worksheet.addRow([name, impact, trajectory, categoryName])
        }
        //Save Excel file
        const filePath = 'CompaniesReport.xlsx'
        await workbook.xlsx.writeFile(filePath)
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error updating Excel file' })
    }
}
