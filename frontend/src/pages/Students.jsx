import React, { useEffect, useState } from 'react';
import api from '../api/axios';

const emptyForm = { name: '', standard: '', city: '', department: '' };

const Students = () => {
    const [students, setStudents] = useState([]);
    const [form, setForm] = useState(emptyForm);
    const [editingId, setEditingId] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    const fetchStudents = async () => {
        try {
            const res = await api.get('/api/students');
            setStudents(res.data);
        } catch (err) {
            setError('Failed to load students');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchStudents(); }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            if (editingId) {
                const res = await api.put(`/api/students/${editingId}`, form);
                setStudents(students.map(s => s._id === editingId ? res.data : s));
            } else {
                const res = await api.post('/api/students', form);
                setStudents([res.data, ...students]);
            }
            setForm(emptyForm);
            setEditingId(null);
            setShowForm(false);
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong');
        }
    };

    const handleEdit = (student) => {
        setForm({ name: student.name, standard: student.standard, city: student.city, department: student.department });
        setEditingId(student._id);
        setShowForm(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this student?')) return;
        try {
            await api.delete(`/api/students/${id}`);
            setStudents(students.filter(s => s._id !== id));
        } catch (err) {
            setError('Failed to delete student');
        }
    };

    const handleCancel = () => {
        setForm(emptyForm);
        setEditingId(null);
        setShowForm(false);
        setError('');
    };

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-6">
            <div className="max-w-5xl mx-auto">

                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Students</h1>
                    {!showForm && (
                        <button
                            onClick={() => setShowForm(true)}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 sm:px-4 text-sm sm:text-base rounded-lg font-medium transition"
                        >
                            + Add Student
                        </button>
                    )}
                </div>

                {/* Add / Edit Form */}
                {showForm && (
                    <div className="bg-white border border-gray-200 rounded-xl shadow-md p-4 sm:p-6 mb-6">
                        <h2 className="text-lg sm:text-xl font-semibold text-gray-700 mb-4">
                            {editingId ? 'Edit Student' : 'Add New Student'}
                        </h2>
                        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
                        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    placeholder="Student name"
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">Standard</label>
                                <input
                                    type="text"
                                    name="standard"
                                    value={form.standard}
                                    onChange={handleChange}
                                    placeholder="e.g. 10th, 12th"
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">City</label>
                                <input
                                    type="text"
                                    name="city"
                                    value={form.city}
                                    onChange={handleChange}
                                    placeholder="City"
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">Department</label>
                                <input
                                    type="text"
                                    name="department"
                                    value={form.department}
                                    onChange={handleChange}
                                    placeholder="e.g. Science, Commerce"
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                                />
                            </div>
                            <div className="sm:col-span-2 flex flex-wrap gap-3 mt-2">
                                <button
                                    type="submit"
                                    className="flex-1 sm:flex-none bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium transition text-sm"
                                >
                                    {editingId ? 'Update' : 'Add Student'}
                                </button>
                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    className="flex-1 sm:flex-none bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2.5 rounded-lg font-medium transition text-sm"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Students List */}
                {loading ? (
                    <p className="text-gray-500 text-center mt-10">Loading...</p>
                ) : students.length === 0 ? (
                    <p className="text-gray-500 text-center mt-10">No students found. Add one!</p>
                ) : (
                    <>
                        {/* Desktop Table — hidden on mobile */}
                        <div className="hidden sm:block bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                                    <tr>
                                        <th className="px-5 py-3">#</th>
                                        <th className="px-5 py-3">Name</th>
                                        <th className="px-5 py-3">Standard</th>
                                        <th className="px-5 py-3">City</th>
                                        <th className="px-5 py-3">Department</th>
                                        <th className="px-5 py-3 text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {students.map((student, index) => (
                                        <tr key={student._id} className="hover:bg-gray-50 transition">
                                            <td className="px-5 py-3 text-gray-500">{index + 1}</td>
                                            <td className="px-5 py-3 font-medium text-gray-800">{student.name}</td>
                                            <td className="px-5 py-3 text-gray-600">{student.standard}</td>
                                            <td className="px-5 py-3 text-gray-600">{student.city}</td>
                                            <td className="px-5 py-3 text-gray-600">{student.department}</td>
                                            <td className="px-5 py-3 text-center">
                                                <button
                                                    onClick={() => handleEdit(student)}
                                                    className="text-blue-600 hover:underline mr-4 font-medium"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(student._id)}
                                                    className="text-red-500 hover:underline font-medium"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Mobile Cards — hidden on desktop */}
                        <div className="sm:hidden flex flex-col gap-4">
                            {students.map((student, index) => (
                                <div key={student._id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-xs text-gray-400">#{index + 1}</span>
                                        <div className="flex gap-3">
                                            <button
                                                onClick={() => handleEdit(student)}
                                                className="text-blue-600 text-sm font-medium hover:underline"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(student._id)}
                                                className="text-red-500 text-sm font-medium hover:underline"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                    <h3 className="text-base font-semibold text-gray-800 mb-2">{student.name}</h3>
                                    <div className="grid grid-cols-2 gap-1 text-sm text-gray-600">
                                        <span className="text-gray-400">Standard</span>
                                        <span>{student.standard}</span>
                                        <span className="text-gray-400">City</span>
                                        <span>{student.city}</span>
                                        <span className="text-gray-400">Department</span>
                                        <span>{student.department}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Students;
