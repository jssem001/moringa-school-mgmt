import React, { useContext, useState, useEffect } from 'react';
import { ProjectContext } from '../context/ProjectContext';
import { toast } from 'react-toastify';
import Sidebar from '../components/Sidebar';

const StudentOverview = ({ studentId }) => {
  const { fetchProjects } = useContext(ProjectContext);
  const [studentProjects, setStudentProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [grading, setGrading] = useState('');
  const [comment, setComment] = useState('');
  const [error, setError] = useState(null);
  const [studentDetails, setStudentDetails] = useState({ name: '', email: '' });

  useEffect(() => {
    if (studentId) {
      fetchStudentDetails(studentId);
      fetchStudentProjects(studentId);
    }
  }, [studentId]);

  const fetchStudentDetails = (studentId) => {
    fetch(`http://127.0.0.1:5000/student/${studentId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to fetch student details');
      }
      return response.json();
    })
    .then((data) => {
      setStudentDetails(data);
      toast.success('Student details loaded successfully!');
    })
    .catch((error) => {
      console.error('Error fetching student details:', error);
      toast.error('Error fetching student details');
    });
  };

  const fetchStudentProjects = (studentId) => {
    fetch(`http://127.0.0.1:5000/student/${studentId}/projects`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to fetch student projects');
      }
      return response.json();
    })
    .then((data) => {
      setStudentProjects(data);
      toast.success('Student projects loaded successfully!');
    })
    .catch((error) => {
      console.error('Error fetching student projects:', error);
      toast.error('Error fetching student projects');
    });
  };

  const handleGradingChange = (event) => {
    setGrading(event.target.value);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmitGrade = async () => {
    if (selectedProject && grading) {
      try {
        const response = await fetch(`http://127.0.0.1:5000/project/${selectedProject.id}/grade`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ grade: grading }),
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        toast.success('Grade submitted successfully');
      } catch (error) {
        console.error('Failed to submit grade:', error);
        setError('Failed to submit grade');
      }
    } else {
      setError('Please select a project and enter a grade.');
    }
  };

  const handleSubmitComment = async () => {
    if (selectedProject && comment) {
      try {
        const response = await fetch(`http://127.0.0.1:5000/project/${selectedProject.id}/comment`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ comment }),
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        toast.success('Comment submitted successfully');
      } catch (error) {
        console.error('Failed to submit comment:', error);
        setError('Failed to submit comment');
      }
    } else {
      setError('Please select a project and enter a comment.');
    }
  };

  return (
    <div style={styles.container}>
      <Sidebar />
      <div style={styles.content}>
        <h1 style={styles.heading}>Student Overview</h1>
        {error && <p style={styles.error}>{error}</p>}
        
        <section style={styles.section}>
          <h2 style={styles.subheading}>Student Details</h2>
          <p style={styles.details}>Name: {studentDetails.name}</p>
          <p style={styles.details}>Email: {studentDetails.email}</p>
        </section>
        
        <section style={styles.section}>
          <h2 style={styles.subheading}>Student Projects</h2>
          {studentProjects.length > 0 ? (
            <ul style={styles.projectList}>
              {studentProjects.map((project) => (
                <li key={project.id} style={styles.projectItem}>
                  <h3 style={styles.projectTitle}>{project.title}</h3>
                  <p style={styles.projectDescription}>{project.description}</p>
                  <button style={styles.button} onClick={() => setSelectedProject(project)}>Select Project</button>
                </li>
              ))}
            </ul>
          ) : (
            <p style={styles.noProjects}>No projects available.</p>
          )}
        </section>
        
        {selectedProject && (
          <section style={styles.section}>
            <h2 style={styles.subheading}>Grade and Comment</h2>
            <div>
              <label style={styles.label}>
                Grade:
                <input style={styles.input} type="number" value={grading} onChange={handleGradingChange} />
              </label>
              <br />
              <label style={styles.label}>
                Comment:
                <textarea style={styles.textarea} value={comment} onChange={handleCommentChange}></textarea>
              </label>
              <br />
              <button style={styles.button} onClick={handleSubmitGrade}>Submit Grade</button>
              <button style={styles.button} onClick={handleSubmitComment}>Submit Comment</button>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
  },
  content: {
    padding: '20px',
    maxWidth: '800px',
    margin: 'auto',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    marginLeft: '250px', // Adjust this value based on the width of your Sidebar
  },
  heading: {
    fontSize: '2rem',
    color: '#333',
    textAlign: 'center',
    marginBottom: '20px',
  },
  subheading: {
    fontSize: '1.5rem',
    color: '#555',
    marginBottom: '10px',
  },
  section: {
    marginBottom: '20px',
  },
  details: {
    fontSize: '1rem',
    color: '#666',
  },
  projectList: {
    listStyleType: 'none',
    padding: '0',
  },
  projectItem: {
    backgroundColor: '#fff',
    padding: '15px',
    borderRadius: '8px',
    marginBottom: '10px',
    boxShadow: '0 1px 5px rgba(0, 0, 0, 0.1)',
  },
  projectTitle: {
    fontSize: '1.25rem',
    color: '#333',
    marginBottom: '5px',
  },
  projectDescription: {
    fontSize: '1rem',
    color: '#777',
    marginBottom: '10px',
  },
  button: {
    padding: '10px 15px',
    fontSize: '1rem',
    color: '#fff',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginRight: '10px',
  },
  input: {
    padding: '10px',
    fontSize: '1rem',
    width: '100%',
    margin: '10px 0',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  textarea: {
    padding: '10px',
    fontSize: '1rem',
    width: '100%',
    height: '100px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    margin: '10px 0',
  },
  label: {
    fontSize: '1rem',
    color: '#555',
    marginBottom: '10px',
    display: 'block',
  },
  error: {
    color: 'red',
    fontSize: '1rem',
    textAlign: 'center',
    marginBottom: '20px',
  },
  noProjects: {
    fontSize: '1rem',
    color: '#888',
    textAlign: 'center',
  },
};

export default StudentOverview;
