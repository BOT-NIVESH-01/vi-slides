import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '../../components/Card'
import Button from '../../components/Button'
import Navbar from '../../components/Navbar'
import { useAuth } from '../../context/AuthContext'
import './CreateSession.css'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000/api'

function CreateSession() {
  const navigate = useNavigate()
  const { token } = useAuth()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleCreate = async () => {
    if (!title.trim()) return

    setIsLoading(true)
    setError('')

    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      }
      if (token) {
        headers['Authorization'] = `Bearer ${token}`
      }

      const response = await fetch(`${API_BASE_URL}/session/create`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim(),
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create session')
      }

      // Navigate to the session dashboard with session data
      navigate(`/teacher/session/${data.session.id}`, {
        state: { session: data.session, isNew: true }
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="create-session-page">
      <Navbar variant="teacher" />
      
      <div className="create-session-content">
        <h1>Create New Session</h1>
        <p className="subtitle">Start a new interactive session for your students</p>

        <Card className="form-card vi-card">
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="title">Session Title *</label>
            <input
              id="title"
              type="text"
              placeholder="e.g., Introduction to React"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Short Description</label>
            <textarea
              id="description"
              placeholder="1-2 lines about what this session covers..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>

          <div className="form-actions">
            <Button variant="secondary" onClick={() => navigate('/teacher/dashboard')}>
              Cancel
            </Button>
            <Button onClick={handleCreate} disabled={!title.trim() || isLoading}>
              {isLoading ? 'Creating...' : 'Create Session'}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default CreateSession
