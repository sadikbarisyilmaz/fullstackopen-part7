import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BlogForm } from '../components/BlogForm'
import { Provider } from "react-redux";
import store from '../store';


test('the form calls the event handler it received as props with the right details when a new blog is created', async () => {
    const mockHandler = jest.fn()

    render(
        <Provider store={store}>
            <BlogForm handleSubmit={mockHandler} />
        </Provider>
    )

    const user = userEvent.setup()

    const authorInput = screen.getByPlaceholderText('author');
    const urlInput = screen.getByPlaceholderText('url');
    const titleInput = screen.getByPlaceholderText('Title');
    const buttonSubmit = screen.getByText('Submit')

    await user.type(titleInput, "titleInput");
    await user.type(authorInput, "authorInput");
    await user.type(
        urlInput,
        'https://www.google.com'
    );

    await user.click(buttonSubmit)
    expect(mockHandler.mock.calls).toHaveLength(1);
    expect(mockHandler.mock.calls[0][0]).toEqual({ "author": "authorInput", "title": "titleInput", "url": "https://www.google.com" });

})