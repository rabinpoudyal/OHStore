
// A mock function to mimic making an async request for data
export function serverLogin(email, password) {
    return new Promise((resolve) =>
      setTimeout(() => resolve({ data: { email: email, password: password } }), 5000)
    );
  }