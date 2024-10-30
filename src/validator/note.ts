import * as yup from 'yup';

export const CreateNoteValidationSchema = yup.object().shape({
	title: yup
		.string().required()
		.label('Title'),
	description: yup
		.string().required()
		.label('Description'),
});
