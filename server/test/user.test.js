import { expect } from 'chai'

describe("Testing user management", () => {
  it("should sign up", async () => {
    const newUser = { email: "foo@test.com", password: "password123" }

    const response = await fetch("http://localhost:3001/user/signup", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user: newUser })
    })

    const data = await response.json()

    if (response.status !== 201) {
      console.error("Signup failed:", data.error)
    }

    expect(response.status).to.equal(201)
    expect(data).to.include.all.keys(["id", "email"])
    expect(data.email).to.equal(newUser.email)
  })
})
