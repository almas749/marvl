import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Formik, Form, Field,  ErrorMessage as FormikErrorMessage  } from 'formik';
import * as Yup from 'yup';

import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import './charFind.scss';

const CharFind = () => {

    const [input, setInput] = useState(null);
    const {loading, error, getLinkToCharacter, clearError} = useMarvelService();

    const onLinkLoaded = (input) => {
        setInput(input);
    }
    
    const updateForm = (input) => {
        clearError();
        getLinkToCharacter(input)
            .then(onLinkLoaded);
    }

    const errorMessage = error ? <div className="char__find_critical_error"><ErrorMessage /></div> : null;

    const result = !input ? null: input.length > 0?
                    <div className="char__find_wrapper">
                        <div className="char__find_success">There is! Visit {input[0].name} page?</div>
                        <Link to={`/characters/${input[0].id}`} className="button button__secondary">
                            <div className="inner">To page</div>
                        </Link>
                    </div> :
                    <div className="char__find_error">
                        The character was not found. Check the name and try again
                    </div>;

    return (
        <div className="char__find_form">
            <Formik
                initialValues={{
                    search: ''
                }}

                validationSchema={
                    Yup.object({
                        search: Yup.string()
                            .required('This field is required')
                    })
                }

                onSubmit = { ({search}) => {
                    updateForm(search);
                }}
            >
                <Form className="char__find">
                    <label className="char__find_label" htmlFor="search">Or find a character by name:</label>
                    <div className="char__find_wrapper">
                        <Field
                            id="search"
                            name="search"
                            type="text"
                            placeholder="Enter name"
                        />
                        <button 
                            type="submit" 
                            className="button button__main" 
                            disabled={loading}>
                            <div className="inner">find</div>
                        </button>
                    </div>
                    <FormikErrorMessage component="div" className="char__find_error" name="search" />
                </Form>
            </Formik>
            {result}
            {errorMessage}
        </div>
    )
}

export default CharFind;