// ========== Append Form
function appendForm(data) {
	const form = new URLSearchParams()

	for(let prop in data) {
		form.append(prop, data[prop])
	}

	return form;
}

export default appendForm