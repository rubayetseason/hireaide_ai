import toast from "react-hot-toast";

interface IFormData {
  name: string;
  work_email: string;
  phone: number;
  tag: string;
}

export function sendEmail(data: IFormData) {
  const apiEndpoint = "/api/email";

  fetch(apiEndpoint, {
    method: "POST",
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((response) => {
      if (response?.success) {
        toast.success("Request sent to join waitlist.", {
          duration: 4000,
          style: { zIndex: 9999999999, background: "#333", color: "#fff" },
        });
      } else {
        toast.error("Something went wrong.", {
          duration: 4000,
          style: { zIndex: 9999999999, background: "#333", color: "#fff" },
        });
      }
    })
    .catch((err) => {
      alert(err);
    });
}
