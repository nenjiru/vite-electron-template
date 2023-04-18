const option = {
    EXAMPLE_VALUE: 'production',
}

if (import.meta.env.DEV)
{
    Object.assign(option, {
        EXAMPLE_VALUE: 'development',
    })
}

export default option
