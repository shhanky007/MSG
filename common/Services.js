import React, { Component } from 'react';
import { API_URL } from "../config/path.js";
import AsyncStorage from '@react-native-community/async-storage';
import RNFetchBlob from 'rn-fetch-blob';
import { Alert } from 'react-native';

export function postService(endpoint, data) {
	return RNFetchBlob.config({
		trusty: true
	}).fetch('POST',
		'' + API_URL + '' + endpoint,
		{
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		JSON.stringify(data)
	)
		.then(response => response.json())
		.then((res) => {
			return res
		})
		.catch((err) => {
			return err
		})
}

export async function postHeaderService(endpoint, data) {
	const token = await AsyncStorage.getItem('MGS_token')
	let body, header;
	body = JSON.stringify(data);
	header = { 'Content-Type': 'application/json', 'access_token': token };
	return RNFetchBlob.config({
		trusty: true
	}).
		fetch('POST',
			'' + API_URL + '' + endpoint,
			header,
			body
		)
		// 	.fetch({url:''+API_URL + endpoint, 
		// 		method: 'POST',
		// 		headers: header,
		// 		body: body
		// })
		.then(response => {
			console.log('api rs', response);
			return response.json()
		})
		.then(res => { return res })
		.catch(err => { return err })
}




export async function getHeaderService(endpoint) {
	const token = await AsyncStorage.getItem('MGS_token')

	console.log(API_URL + '' + endpoint);
	let body, header;
	header = { Accept: 'application/json', 'Content-Type': 'application/json', 'access_token': token };
	return RNFetchBlob.config({
		trusty: true
	}).
		fetch('GET',
			'' + API_URL + '' + endpoint,
			header,
			body
		)

		// fetch(API_URL + '' + endpoint, {
		// 	method: 'GET',
		// 	headers: header,
		// })
		.then(response =>
			response.json())
		.then(res => { return res })
		.catch(err => { return err })
}
export function getService(endpoint) {
	return RNFetchBlob.config({
		trusty: true
	}).
		fetch('GET',
			'' + API_URL + '' + endpoint,
		)

		.then(response => {

			return response.json()
		})
		.then(res => { return res })
		.catch(err => { return err })
}

export async function downloadPDF(endpoint, fileName) {

	const { config, fs, } = RNFetchBlob
	let DownloadDir = fs.dirs.DownloadDir // this is the pictures directory. You can check the available directories in the wiki.
	// console.log('DownloadDir', DownloadDir);
	// console.log('endpoint', endpoint);
	// console.log('fileName', fileName);
	let options = {
		trusty:true,
		fileCache: true,
		addAndroidDownloads: {
			useDownloadManager: true, // setting it to true will use the device's native download manager and will be shown in the notification bar.
			notification: true,
			path: DownloadDir, // this is the path where your downloaded file will live in
			title: fileName,
			mime: 'application/pdf',
			// Make the file scannable  by media scanner
			mediaScannable: true,
			description: 'Downloading Reports.'
		}
	}
	return (RNFetchBlob.config(options).fetch('GET', endpoint)
		// .then(response => {
		// 	console.log('response down', response);
		// 	return response.json()
		// })
		.then(res => { console.log('response down2', JSON.stringify(res.path)); return res })
		.catch(err => { console.log(err) })
	)
}


export async function putHeaderService(endpoint, data) {
	const token = await AsyncStorage.getItem('MGS_token')
	let body, header;
	body = JSON.stringify(data);
	header = { 'Content-Type': 'application/json', 'access_token': token };
	return RNFetchBlob.config({
		trusty: true
	}).
		fetch('PUT',
			'' + API_URL + '' + endpoint,
			header,
			body
		)
		.then(response => response.json())
		.then(res => { return res })
		.catch(err => { return err })
}

export async function clearSession() {
	try {
		console.log('Clearing Session!');
		await AsyncStorage.removeItem('MGS_token');
		await AsyncStorage.removeItem('MGS_customer_id');
		await AsyncStorage.removeItem('MGS_f_name');
		await AsyncStorage.removeItem('MGS_Login_Data');

		return true;
	}
	catch (exception) {
		return false;
	}
}

export async function clearLocalCart() {
	try {
		console.log('Clearing MGS_cart_array!');
		await AsyncStorage.removeItem('MGS_cart_array');
		
		return true;
	}
	catch (exception) {
		return false;
	}
}

export function getFormatedDate(date) {
	const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	var d = new Date(date),
		month = '' + months[d.getMonth()],
		day = '' + d.getDate();
	let year = '' + d.getFullYear();
	if (day.length < 2)
		day = '0' + day;
	let s = month + ' ' + day;
	return [s, year].join(',');
}

export const getDateFormateForAPI = (date) => {
	var d = new Date(date),
		month = '' + (d.getMonth() + 1),
		day = '' + d.getDate(),
		year = d.getFullYear();

	if (month.length < 2)
		month = '0' + month;
	if (day.length < 2)
		day = '0' + day;

	return [year, month, day].join('-');
}
export function getDateFormat(date) {
	const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	let d = new Date(date);
	let month = months.find((x, i) => i === d.getMonth());
	return month + ' ' + d.getDate()
}

export function validateEmail(email) {
	const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email) ? true : false;
}
export function getYears() {
	const currentYear = (new Date()).getFullYear();
	const range = (start, stop, step) => Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + (i * step));
	return range(currentYear, currentYear - 100, -1)
}

export function getDateTime() {
	let d = new Date();
	let date_format_str = d.getFullYear().toString() + "-" + ((d.getMonth() + 1).toString().length == 2 ? (d.getMonth() + 1).toString() : "0" + (d.getMonth() + 1).toString()) + "-" + (d.getDate().toString().length == 2 ? d.getDate().toString() : "0" + d.getDate().toString()) + " " + (d.getHours().toString().length == 2 ? d.getHours().toString() : "0" + d.getHours().toString()) + ":" + ((parseInt(d.getMinutes() / 5) * 5).toString().length == 2 ? (parseInt(d.getMinutes() / 5) * 5).toString() : "0" + (parseInt(d.getMinutes() / 5) * 5).toString()) + ":00";
	return date_format_str;
}
export async function getUserData() {
	return await AsyncStorage.getItem('AGT_Login_Data').then(res => {
		return res
	}).catch(err => { return err })
}

export async function getMasterData() {
	return await AsyncStorage.getItem('AGT_Master_Data').then(res => {
		return res
	}).catch(err => { return err })
}

export async function getCarReportId() {
	return await AsyncStorage.getItem('AGT_Car_Report_Id').then(res => {
		return res
	}).catch(err => { return err })
}


export async function getBodyParts() {
	return await AsyncStorage.getItem('AGT_Body_Data').then(res => {
		return res
	}).catch(err => { return err })
}

export async function postHeaderMultiPartService(endpoint, data) {
	const token = await AsyncStorage.getItem('AGT_token')
	const role = await AsyncStorage.getItem('AGT_role')

	const header = {
		'token': token, 'role': role,
		Accept: 'application/json',
		'Content-Type': 'multipart/form-data',
	}
	const body = data

	return fetch(API_URL + endpoint, {
		method: 'POST',
		headers: header,
		body: body
	})
		.then(response => response.json())
		.then(res => { return res })
		.catch(err => { return err })

}












export function showAlertDialog(title, message) {
	Alert.alert(
		title,
		message,
		[
			{
				text: 'Cancel',
				onPress: () => console.log('Cancel Pressed'),
				style: 'cancel',
			},
			{ text: 'OK', onPress: () => console.log('OK Pressed') },
		]
	);
}

// export function putHeaderService(endpoint,data,formtype){
// 	let body,header;
// 	body = (formtype  == 'multipart') ? data : JSON.stringify(data);
// 	header = (formtype  == 'multipart') ? { 'X_Auth_Token' : localStorage.getItem('JTOG_X_Auth_Token') } :
// 		{ Accept: 'application/json', 'Content-Type' : 'application/json', 'X_Auth_Token' : localStorage.getItem('JTOG_X_Auth_Token') };
// 	return fetch(API_URL+''+endpoint,{
// 		method : 'PUT',
// 		headers : header,
// 		body : body
// 	})
// 	.then(response=>response.json())
// 	.then(res=>{  return res})
// 	.catch(err=>{return err})
// }

