import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { updateReviewThunk, getAllReviewsThunk } from "../../store/review";
import "./UpdateReview.css"

function UpdateReview({ photocardId, review }) {
    const dispatch = useDispatch();
    // const history = useHistory();
    // const { photocardId } = useParams();
    const reviewObj = useSelector((state) => state.reviews.photocard);
    console.log('HEELOOOO', reviewObj)
    const userId = useSelector((state) => state.session.user.id);
    const { closeModal } = useModal();

    const [text, setText] = useState(reviewObj.text || "");
    const [errors, setErrors] = useState({});
    const [hasSubmitted, setHasSubmitted] = useState(false);

    useEffect(() => {
        dispatch(getAllReviewsThunk(photocardId));
    }, [dispatch, photocardId])

    useEffect(() => {
        setText(reviewObj.text || "");
    }, [reviewObj]);

    function errorsChecked(text) {
        const errors = {};
        if (!text) errors.text = 'Review is required';

        setErrors(errors);
        return errors;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);
        const errorsFound = errorsChecked(
            text
        );

        const updatedReview = {
            id: review.id,
            photocard_id: photocardId,
            user_id: userId,
            text: text
        };

        if (Object.keys(errorsFound).length === 0) {
            const res = await dispatch(updateReviewThunk(updatedReview));

            if (res) {
                dispatch(getAllReviewsThunk(photocardId));

                closeModal();
            }
        }
    };

    // const handleClose = () => {
    //     closeModal();
    // }

    return (
        <div className='main-update-review-container'>
            <div className='updated-review-title'>Update your Review</div>
            <div className='update-review-form-container'>
                <form className='update-review-form' onSubmit={handleSubmit}>
                    <label className='update-review-label'>
                        {/* Review */}
                        <div className='update-review-box'>
                            <input className='review-update-box'
                            type="text"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder='Review'
                            />
                        </div>
                    </label>
                    {hasSubmitted && errors.text && (
                        <p className='errors'>{errors.text}</p>
                    )}
                    <button type='submit' className='update-review-button'>Update Review</button>
                </form>
            </div>
        </div>
    )

};

export default UpdateReview;
