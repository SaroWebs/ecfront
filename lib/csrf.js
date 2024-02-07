import { nextCsrf } from "next-csrf";

const options = {
    secret: 'my-secret-key',
}

export const { csrf, csrfToken } = nextCsrf(options);