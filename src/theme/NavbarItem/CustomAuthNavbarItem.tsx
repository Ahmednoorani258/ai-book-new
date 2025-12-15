
import React from 'react';
import {useAuth} from '../../contexts/AuthContext';
import Link from '@docusaurus/Link';
import './AuthNavbarItem.module.css';

export default function AuthNavbarItem() {
    const authContext = useAuth() as any;

    if (!authContext) {
        return null;
    }

    const {user, loading, logout} = authContext;

    if (loading) {
        return <div className="navbar-auth-loader"></div>;
    }

    return (
        <div className="navbar-auth-container">
            {user ? (
                <button className="button button--secondary" onClick={logout}>
                    Logout
                </button>
            ) : (
                <>
                    <Link to="/login" className="button button--primary margin-right--sm">
                        Login
                    </Link>
                    <Link to="/register" className="button button--secondary">
                        Sign Up
                    </Link>
                </>
            )}
        </div>
    );
}
