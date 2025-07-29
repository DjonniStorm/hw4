export class Api {
  constructor(private baseUrl: string) {}

  protected async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      next: {
        revalidate: 60,
      },
    });

    if (!response.ok) {
      let errorMessage = `HTTP error! status: ${response.status}`;

      try {
        const cloned = response.clone();
        const errorBody = await cloned.json();

        const msg = errorBody?.message;
        if (Array.isArray(msg)) {
          errorMessage = msg.join(", ");
        } else if (typeof msg === "string") {
          errorMessage = msg;
        }
      } catch {}

      throw new Error(errorMessage);
    }

    return response.json();
  }

  public async get<T>(endpoint: string): Promise<T> {
    console.log("get request>>>", endpoint);
    return this.makeRequest<T>(endpoint, {
      method: "GET",
      credentials: "include",
      next: {
        revalidate: 1000,
      },
    });
  }

  public async post<T>(endpoint: string, body: unknown): Promise<T> {
    return this.makeRequest<T>(endpoint, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(body),
    });
  }

  public async patch<T>(endpoint: string, body: unknown): Promise<T> {
    return this.makeRequest<T>(endpoint, {
      method: "PATCH",
      credentials: "include",
      body: JSON.stringify(body),
    });
  }

  public async delete<T>(endpoint: string): Promise<T> {
    return this.makeRequest<T>(endpoint, {
      method: "DELETE",
      credentials: "include",
    });
  }
}
